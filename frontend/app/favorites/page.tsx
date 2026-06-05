import { ProductSection } from '../../src/components/ProductSection';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto min-h-[60vh]">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-600 fill-red-600" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">المفضلة</h1>
          <p className="text-gray-500">المنتجات التي قمت بحفظها لوقت لاحق</p>
        </div>
      </div>
      
      {/* We reuse ProductSection for now, ideally it would fetch saved items */}
      <ProductSection title="" />
      
    </div>
  );
}
