import { ProductCard } from './ProductCard';
import { ChevronLeft } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  products: any[];
}

export function ProductSection({ title, products }: ProductSectionProps) {
  if (!products || products.length === 0) return null;
  return (
    <section className="py-8 bg-gray-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-r-4 border-red-600 pr-2">
            {title}
          </h3>
          <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
            عرض الكل
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
