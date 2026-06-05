"use client";

import { X, Home, ShoppingBag, Grid, Phone, Info } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/eshk-logo.png" alt="عشك" className="h-8 object-contain" />
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            <Link 
              href="/" 
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">الرئيسية</span>
            </Link>
            
            <Link 
              href="/products" 
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Grid className="w-5 h-5" />
              <span className="font-medium">المنتجات</span>
            </Link>

            <Link 
              href="/cart" 
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">سلة المشتريات</span>
            </Link>
            
            <div className="my-4 border-t border-gray-100"></div>

            <a 
              href="#" 
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">من نحن</span>
            </a>

            <a 
              href="#" 
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">اتصل بنا</span>
            </a>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            © 2026 متجر عشك للأدوات المنزلية.
          </p>
        </div>
      </div>
    </>
  );
}
