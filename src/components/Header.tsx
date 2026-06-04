import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import Link from 'next/link';


interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full bg-white shadow-sm">

      {/* Main Header */}
      <div className="py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center">
            <img src="/eshk-logo.png" alt="عشك" className="h-10 object-contain" />
          </Link>
          <div className="md:hidden flex space-x-3 rtl:space-x-reverse">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-2xl w-full">
          <div className="relative flex w-full">
            <select className="hidden md:block bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-r-md focus:outline-none focus:border-red-500 border-l-0">
              <option>كل الفئات</option>
              <option>أجهزة منزلية</option>
              <option>أدوات المطبخ</option>
            </select>
            <input
              type="text"
              placeholder="ابحث عن المنتجات، العلامات التجارية..."
              className="w-full border border-gray-300 py-2 px-4 focus:outline-none focus:border-red-500 rounded-md md:rounded-r-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-l-md transition flex items-center justify-center absolute left-0 top-0 bottom-0 border border-red-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex flex-col items-center cursor-pointer hover:text-red-600 transition">
            <User className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium mt-1">حسابي</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-red-600 transition relative">
            <Heart className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium mt-1">المفضلة</span>
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
          <Link href="/cart" className="flex flex-col items-center cursor-pointer hover:text-red-600 transition relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium mt-1">عربة التسوق</span>
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-blue-900 text-white px-4 md:px-8">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="bg-red-600 flex items-center gap-2 px-4 py-3 font-bold hover:bg-red-700 transition"
          >
            <Menu className="w-5 h-5" />
            تصفح الأقسام
          </button>

          <nav className="hidden md:flex items-center ml-auto rtl:mr-6 space-x-6 rtl:space-x-reverse font-medium">
            <Link href="/" className="hover:text-red-400 transition py-3">عروض اليوم</Link>
            <Link href="/products" className="hover:text-red-400 transition py-3">أجهزة منزلية</Link>
            <Link href="/products" className="hover:text-red-400 transition py-3">أدوات المطبخ</Link>
            <Link href="/products" className="hover:text-red-400 transition py-3">ديكور المنزل</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
