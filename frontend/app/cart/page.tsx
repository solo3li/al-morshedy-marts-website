import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">سلة المشتريات</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Cart Items List */}
            <div className="p-6 border-b border-gray-100 flex gap-4 items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center p-2">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=200&q=80" alt="Product" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900 line-clamp-2">عجانة كهربائية متعددة الوظائف 1000 واط مع وعاء 5 لتر - ستانلس ستيل</h3>
                <div className="text-sm text-gray-500 mt-1">الماركة: كينوود</div>
                <div className="font-bold text-red-600 mt-2">4,999 ج.م</div>
              </div>
              <div className="flex flex-col items-end gap-4 shrink-0">
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden w-24 h-8">
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 font-medium">-</button>
                  <div className="flex-1 flex items-center justify-center text-sm font-bold border-x border-gray-300">1</div>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 font-medium">+</button>
                </div>
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <Link href="/products" className="text-red-600 font-medium flex items-center gap-2 hover:underline">
                <ArrowRight className="w-4 h-4" />
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي (1 منتج)</span>
                <span className="font-bold">4,999 ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الشحن</span>
                <span className="text-green-600 font-bold">مجاني</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-extrabold">
                <span>الإجمالي</span>
                <span className="text-red-600">4,999 ج.م</span>
              </div>
            </div>
            <Link href="/checkout" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md">
              <ShoppingCart className="w-5 h-5" />
              إتمام الشراء
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
