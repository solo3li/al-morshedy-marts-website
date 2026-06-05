import { Star, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';
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
      <button className="absolute top-2 left-2 z-10 p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition shadow-sm">
        <Heart className="w-5 h-5" />
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
          
          <button className="w-full mt-4 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            أضف للعربة
          </button>
        </div>
      </div>
    </div>
  );
}
