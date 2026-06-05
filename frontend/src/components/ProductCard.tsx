'use client';

import { useState } from 'react';
import { Star, ShoppingCart, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';
interface ProductProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    oldPrice: number | null;
    discount: number | null;
    image: string;
    rating: number;
    reviews: number;
    badge?: string;
  };
}

export function ProductCard({ product }: ProductProps) {
  const [isAddingCart, setIsAddingCart] = useState(false);
  const [isAddingFav, setIsAddingFav] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setIsAddingCart(true);
    try {
      await fetchApi('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      alert('تمت الإضافة إلى عربة التسوق بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء الإضافة للعربة');
    } finally {
      setIsAddingCart(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setIsAddingFav(true);
    try {
      await fetchApi(`/favorites/${product.id}`, {
        method: 'POST'
      });
      alert('تمت الإضافة إلى المفضلة بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء الإضافة للمفضلة');
    } finally {
      setIsAddingFav(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden relative group flex flex-col h-full">
      
      {/* Badges */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        {product.discount && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            خصم {product.discount}%
          </span>
        )}
        {product.badge && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button 
        onClick={handleAddToFavorites}
        disabled={isAddingFav}
        className="absolute top-2 left-2 z-10 p-1.5 bg-white rounded-full text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition shadow-sm"
      >
        {isAddingFav ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className="w-5 h-5" />}
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-gray-500 mb-1 font-medium">{product.brand}</span>
        <Link href={`/products/${product.id}`} className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[40px] leading-snug hover:text-red-600 transition-colors">
          {product.name}
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold text-gray-700 mr-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-gray-900">
              {product.price.toLocaleString('ar-EG')} <span className="text-xs font-normal">ج.م</span>
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.oldPrice.toLocaleString('ar-EG')}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAddingCart}
            className="w-full mt-4 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isAddingCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
            أضف للعربة
          </button>
        </div>
      </div>
    </div>
  );
}
