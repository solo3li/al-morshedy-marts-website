import { Search, Star, Filter } from 'lucide-react';

export function AdvancedFilter() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-red-600" />
          تصفية النتائج
        </h2>
        <button className="text-xs text-blue-600 hover:text-blue-800 transition font-medium">
          إعادة ضبط
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-bold text-gray-700 mb-4">الفئة</h3>
        <div className="space-y-3">
          {['أجهزة منزلية', 'إلكترونيات وموبايلات', 'سوبر ماركت', 'عناية وجمال', 'أدوات مطبخ'].map((cat, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer" />
              <span className="text-sm text-gray-600 group-hover:text-red-600 transition">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-bold text-gray-700 mb-4">السعر (ج.م)</h3>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="من" 
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-red-500" 
          />
          <span className="text-gray-400">-</span>
          <input 
            type="number" 
            placeholder="إلى" 
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-red-500" 
          />
        </div>
        <input 
          type="range" 
          min="0" 
          max="100000" 
          className="w-full mt-4 accent-red-600"
        />
      </div>

      {/* Brands */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-bold text-gray-700 mb-4">العلامة التجارية</h3>
        <div className="relative mb-3">
          <input 
            type="text" 
            placeholder="ابحث عن ماركة..." 
            className="w-full border border-gray-300 rounded-md py-1.5 px-3 pr-8 text-sm focus:outline-none focus:border-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
        </div>
        <div className="space-y-3 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
          {['Samsung', 'LG', 'Apple', 'Bosch', 'Tornado', 'Sharp', 'Sony', 'Philips'].map((brand, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer" />
              <span className="text-sm text-gray-600 group-hover:text-red-600 transition" dir="ltr">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-bold text-gray-700 mb-4">التقييم</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} 
                  />
                ))}
                {rating < 5 && <span className="text-xs text-gray-500 ml-1">وأكثر</span>}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Offers */}
      <div>
        <h3 className="font-bold text-gray-700 mb-4">عروض وخصومات</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer" />
          <span className="text-sm text-gray-600 group-hover:text-red-600 transition font-medium">المنتجات المخفضة فقط</span>
        </label>
      </div>

      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md mt-6 transition shadow-sm">
        تطبيق الفلاتر
      </button>
    </div>
  );
}
