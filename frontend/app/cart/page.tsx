'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { fetchApi, getImageUrl } from '../../src/utils/api';
import { useAuthStore } from '../../src/store/authStore';
import { useShopStore } from '../../src/store/shopStore';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const { setCartCount } = useShopStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      const data = await fetchApi('/cart');
      const items = data || [];
      setCartItems(items);
      setCartCount(items.length);
    } catch (error) {
      console.error('Error loading cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await fetchApi(`/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify(quantity),
      });
      loadCart();
    } catch (error) {
      console.error('Error updating quantity', error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await fetchApi(`/cart/${id}`, { method: 'DELETE' });
      loadCart();
    } catch (error) {
      console.error('Error removing item', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">يرجى تسجيل الدخول لعرض سلة المشتريات</h2>
        <Link href="/login" className="bg-rose-600 text-white px-6 py-2 rounded-lg inline-block">تسجيل الدخول</Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-rose-600" /></div>;
  }

  const subTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">سلة المشتريات</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4">سلة المشتريات فارغة</h2>
          <Link href="/products" className="text-rose-600 font-medium hover:underline">متابعة التسوق</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-100 flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center p-2">
                    <img src={getImageUrl(item.product.image)} alt={item.product.name} onError={(e) => { e.currentTarget.src = '/eshk-logo.png'; }} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 line-clamp-2">{item.product.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">الماركة: {item.product.brand}</div>
                    <div className="font-bold text-rose-600 mt-2">{item.product.price} ج.م</div>
                  </div>
                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden w-24 h-8">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 bg-gray-50 hover:bg-gray-100 font-medium">-</button>
                      <div className="flex-1 flex items-center justify-center text-sm font-bold border-x border-gray-300">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 bg-gray-50 hover:bg-gray-100 font-medium">+</button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <Link href="/products" className="text-rose-600 font-medium flex items-center gap-2 hover:underline">
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
                  <span className="text-gray-600">المجموع الفرعي ({cartItems.length} منتج)</span>
                  <span className="font-bold">{subTotal} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span className="text-green-600 font-bold">مجاني</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-extrabold">
                  <span>الإجمالي</span>
                  <span className="text-rose-600">{subTotal} ج.م</span>
                </div>
              </div>
              <Link href="/checkout" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md">
                <ShoppingCart className="w-5 h-5" />
                إتمام الشراء
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
