import { ProductSection } from '../../src/components/ProductSection';

export default function ProductsPage() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">جميع المنتجات</h1>
        <p className="text-gray-500">تصفح أحدث وأفضل الأدوات المنزلية لدينا</p>
      </div>
      
      {/* Filters & Sorting could go here */}
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
  );
}
