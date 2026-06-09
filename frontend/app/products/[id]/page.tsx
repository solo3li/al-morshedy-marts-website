'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Loader2 } from 'lucide-react';
import { fetchApi } from '../../../src/utils/api';
import { useAuthStore } from '../../../src/store/authStore';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToFav, setIsAddingToFav] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApi(`/Products/${params.id}`);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تحميل تفاصيل المنتج.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/products/' + params.id);
      return;
    }

    setIsAddingToCart(true);
    try {
      await fetchApi('/Cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, quantity })
      });
      // Optionally redirect to cart or show success toast
      router.push('/cart');
    } catch (err: any) {
      alert(err.message || 'فشل إضافة المنتج للسلة.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/products/' + params.id);
      return;
    }

    setIsAddingToFav(true);
    try {
      await fetchApi(`/Favorites/${product.id}`, { method: 'POST' });
      alert('تمت الإضافة للمفضلة بنجاح!');
    } catch (err: any) {
      alert(err.message || 'فشل إضافة المنتج للمفضلة.');
    } finally {
      setIsAddingToFav(false);
    }
  };

  if (isLoading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-red-600" /></div>;
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'المنتج غير موجود'}</h2>
        <button onClick={() => router.push('/products')} className="text-blue-600 hover:underline">العودة للمنتجات</button>
      </div>
    );
  }

  // To display full URL for the image if it is a relative path. The API url is http://localhost:5256
  // But usually, we just prepend the backend URL for relative images if not provided by backend properly.
  // Assuming the backend provides relative path or absolute. Let's use it as is since Next.js Image or img handles it.
  // Wait, if it's '/images/product.png' and frontend is on port 3000, it will break.
  // We need to prepend the backend URL if it starts with '/'.
  const imageUrl = product.image?.startsWith('/') 
    ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5256') + product.image 
    : product.image;

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-l border-gray-100">
          <div className="aspect-square rounded-lg bg-gray-50 mb-4 flex items-center justify-center p-8">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-md bg-gray-50 border-2 border-transparent hover:border-red-500 cursor-pointer overflow-hidden p-2">
                 <img 
                  src={imageUrl} 
                  alt={`Thumb ${i}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            {product.badge && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">{product.badge}</span>
            )}
            <span className="text-gray-500 text-sm">{product.brand}</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'fill-current' : 'fill-transparent text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">({product.reviews} تقييم)</span>
          </div>

          <div className="text-4xl font-extrabold text-red-600 mb-2">
            {product.price} <span className="text-xl font-medium">ج.م</span>
          </div>
          {product.oldPrice && (
            <div className="text-sm text-gray-500 line-through mb-6">{product.oldPrice} ج.م</div>
          )}

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description || 'وصف المنتج غير متوفر حاليا. نحن نعمل على إضافة المزيد من التفاصيل قريبا.'}
          </p>

          <div className="flex gap-4 mb-8">
            <div className="w-24 md:w-32 flex border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 bg-gray-50 hover:bg-gray-100 text-lg font-medium transition-colors">-</button>
              <div className="flex-1 flex items-center justify-center font-bold border-x border-gray-300">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="flex-1 bg-gray-50 hover:bg-gray-100 text-lg font-medium transition-colors">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-red-600/30 disabled:opacity-50"
            >
              {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
              أضف للسلة
            </button>
            <button 
              onClick={handleAddToFavorites}
              disabled={isAddingToFav}
              className="p-3 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-gray-400 disabled:opacity-50"
            >
              {isAddingToFav ? <Loader2 className="w-6 h-6 animate-spin" /> : <Heart className="w-6 h-6" />}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-green-600" />
              ضمان أصالة المنتجات
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-blue-600" />
              توصيل سريع وموثوق
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5 text-orange-500" />
              استرجاع مجاني بشروط
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
