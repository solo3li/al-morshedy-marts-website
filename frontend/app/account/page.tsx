import { User, Settings, Package, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">حسابي</h1>
        <p className="text-gray-500">مرحباً بك في لوحة تحكم حسابك</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <nav className="space-y-2">
            <Link href="/account" className="flex items-center gap-3 bg-red-50 text-red-600 font-medium p-3 rounded-md transition">
              <User className="w-5 h-5" />
              المعلومات الشخصية
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 hover:text-red-600 font-medium p-3 rounded-md transition">
              <Package className="w-5 h-5" />
              الطلبات
            </Link>
            <Link href="/favorites" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 hover:text-red-600 font-medium p-3 rounded-md transition">
              <Heart className="w-5 h-5" />
              المفضلة
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 hover:text-red-600 font-medium p-3 rounded-md transition">
              <Settings className="w-5 h-5" />
              الإعدادات
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">المعلومات الشخصية</h2>
            
            <form className="space-y-6 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-500" placeholder="أدخل اسمك" defaultValue="عميل عشك" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-500 bg-gray-50" disabled defaultValue="user@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input type="tel" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-500" placeholder="01xxxxxxxxx" />
              </div>
              
              <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition">
                حفظ التغييرات
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
