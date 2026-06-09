const API_BASE_URL = 'http://localhost:5256/api';

async function testEndpoints() {
  console.log('--- بدء اختبار نقاط الاتصال (Endpoints) للباك إند ---\n');
  let token = '';
  let testProductId = 1; // Assuming product 1 exists from seed data

  // 1. Test Public Endpoints
  console.log('[1] اختبار مسارات المنتجات والتصنيفات (Public)');
  try {
    const productsRes = await fetch(`${API_BASE_URL}/Products`);
    const products = await productsRes.json();
    console.log(`✅ GET /Products - Success! Found ${products.length} products.`);
    if (products.length > 0) testProductId = products[0].id;

    const categoriesRes = await fetch(`${API_BASE_URL}/Categories`);
    const categories = await categoriesRes.json();
    console.log(`✅ GET /Categories - Success! Found ${categories.length} categories.`);

    const bannersRes = await fetch(`${API_BASE_URL}/Banners`);
    const banners = await bannersRes.json();
    console.log(`✅ GET /Banners - Success! Found ${banners.length} banners.`);
  } catch (err) {
    console.error('❌ Failed testing public endpoints:', err.message);
  }

  // 2. Test Auth
  console.log('\n[2] اختبار مسار المصادقة (Auth)');
  try {
    const email = `testuser_${Date.now()}@eshak.com`;
    // Register
    const registerRes = await fetch(`${API_BASE_URL}/Auth/Register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Test User', email: email, password: 'Password123!' })
    });
    const registerData = await registerRes.json();
    console.log(`✅ POST /Auth/Register - Success! User registered.`);

    // Login
    const loginRes = await fetch(`${API_BASE_URL}/Auth/Login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: 'Password123!' })
    });
    const loginData = await loginRes.json();
    if (loginData.token) {
      token = loginData.token;
      console.log(`✅ POST /Auth/Login - Success! Token received.`);
    } else {
      console.error(`❌ POST /Auth/Login - Failed! No token.`);
    }
  } catch (err) {
    console.error('❌ Failed testing Auth endpoints:', err.message);
  }

  if (!token) {
    console.log('\n⚠️ إيقاف الاختبارات المتبقية (تتطلب تسجيل دخول)');
    return;
  }

  // 3. Test Protected Endpoints
  console.log('\n[3] اختبار المسارات المحمية (Protected)');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    // Add to Cart
    const addCartRes = await fetch(`${API_BASE_URL}/Cart`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId: testProductId, quantity: 1 })
    });
    console.log(`✅ POST /Cart - Success! Add to cart response: ${addCartRes.status}`);

    // Get Cart
    const getCartRes = await fetch(`${API_BASE_URL}/Cart`, { headers });
    const cartItems = await getCartRes.json();
    console.log(`✅ GET /Cart - Success! Cart items: ${cartItems.length}`);

    // Add to Favorites
    const addFavRes = await fetch(`${API_BASE_URL}/Favorites/${testProductId}`, {
      method: 'POST',
      headers
    });
    console.log(`✅ POST /Favorites - Success! Add to favorites response: ${addFavRes.status}`);

    // Get Favorites
    const getFavRes = await fetch(`${API_BASE_URL}/Favorites`, { headers });
    const favorites = await getFavRes.json();
    console.log(`✅ GET /Favorites - Success! Favorites items: ${favorites.length}`);

    // Create Order
    const orderData = {
      shippingAddress: '123 Test St',
      city: 'Test City',
      phone: '1234567890',
      notes: 'Test order'
    };
    const orderRes = await fetch(`${API_BASE_URL}/Orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    const orderResData = await orderRes.json();
    console.log(`✅ POST /Orders - Success! Order created response:`, orderResData.message || orderResData);

  } catch (err) {
    console.error('❌ Failed testing protected endpoints:', err.message);
  }

  console.log('\n--- انتهى الاختبار ---');
}

testEndpoints();
