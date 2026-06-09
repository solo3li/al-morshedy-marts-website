'use client';

import { useEffect, useState } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { ProductCard } from '../../src/components/ProductCard';
import { fetchApi } from '../../src/utils/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      // Fetch all products (no category filter for now)
      const data = await fetchApi('/Products');
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل المنتجات.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto mb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">جميع المنتجات</h1>
        <p className="text-gray-500">تصفح أحدث وأفضل الأدوات المنزلية لدينا</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-end mb-4">
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-200 transition">
            <Filter className="w-4 h-4" />
            فلاتر متقدمة
          </button>
        </div>

        {/* Sidebar / Advanced Filter */}
        <div className="hidden lg:block w-full lg:w-1/4">
          {/* <AdvancedFilter /> */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold mb-4 text-gray-800">التصنيفات</h3>
            <p className="text-gray-500 text-sm">التصفية قيد التطوير...</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4">
          {/* Filters & Sorting */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
            <span className="text-sm font-medium text-gray-600">
              {isLoading ? 'جاري التحميل...' : `عرض ${products.length} منتج`}
            </span>
            <select className="border border-gray-300 py-1.5 px-3 rounded-md text-sm focus:outline-none focus:border-red-500">
              <option>الترتيب الافتراضي</option>
              <option>الأحدث</option>
              <option>السعر: من الأقل للأعلى</option>
              <option>السعر: من الأعلى للأقل</option>
            </select>
          </div>

          {isLoading ? (
             <div className="flex justify-center items-center py-20">
               <Loader2 className="w-10 h-10 animate-spin text-red-600" />
             </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600 font-medium">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              لا توجد منتجات متاحة حالياً.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
