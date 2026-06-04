import { ProductSection } from '../../src/components/ProductSection';
import { AdvancedFilter } from '../../src/components/AdvancedFilter';
import { Filter } from 'lucide-react';
export default function ProductsPage() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
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
          <AdvancedFilter />
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4">
          {/* Filters & Sorting */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
            <span className="text-sm font-medium text-gray-600">عرض 24 من أصل 120 منتج</span>
            <select className="border border-gray-300 py-1.5 px-3 rounded-md text-sm focus:outline-none focus:border-red-500">
              <option>الترتيب الافتراضي</option>
              <option>الأحدث</option>
              <option>السعر: من الأقل للأعلى</option>
              <option>السعر: من الأعلى للأقل</option>
            </select>
          </div>

          <ProductSection title="" />
          <div className="mt-8">
            <ProductSection title="" />
          </div>
        </div>
      </div>
    </div>
  );
}
