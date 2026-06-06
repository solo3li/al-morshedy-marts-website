#!/bin/bash
set -e

echo "1. Installing K3s..."
curl -sfL https://get.k3s.io | sh -s -
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

echo "2. Installing Docker..."
if ! command -v docker &> /dev/null
then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable --now docker
fi

echo "3. Installing Helm..."
if ! command -v helm &> /dev/null
then
    curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
    chmod 700 get_helm.sh
    ./get_helm.sh
fi

echo "4. Extracting the project..."
mkdir -p ~/eshak
tar -xf ~/eshak.tar -C ~/eshak
sed -i 's/8.0/10.0/g' ~/eshak/backend/Dockerfile
sed -i 's/node:18-alpine/node:22-alpine/g' ~/eshak/frontend/Dockerfile

echo "5. Building Docker images..."
cd ~/eshak
docker build -t eshak-backend:latest ./backend
docker build -t eshak-frontend:latest ./frontend

echo "6. Loading images into K3s containerd..."
docker save eshak-backend:latest | k3s ctr images import -
docker save eshak-frontend:latest | k3s ctr images import -

echo "7. Traefik is included in K3s..."

echo "8. Installing Cert-Manager..."
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true

echo "9. Waiting for cert-manager pods to be ready..."
kubectl wait --for=condition=Ready pods --all -n cert-manager --timeout=300s

echo "10. Creating ClusterIssuer for Let's Encrypt..."
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@eshak.68.183.13.154.nip.io
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
EOF

echo "11. Deploying the application via Helm..."

helm upgrade --install eshak ./deploy/eshak-chart

echo "Setup Complete!"
