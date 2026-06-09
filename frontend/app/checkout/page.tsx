'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2, CreditCard, Home, MapPin, Phone } from 'lucide-react';
import { fetchApi, createOrder, getImageUrl } from '../../src/utils/api';
import { useAuthStore } from '../../src/store/authStore';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    shippingAddress: '',
    city: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  const loadCart = async () => {
    try {
      const data = await fetchApi('/cart');
      setCartItems(data || []);
      if (data && data.length === 0) {
        setError('سلة المشتريات فارغة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تحميل السلة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('السلة فارغة. لا يمكن إتمام الطلب.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await createOrder(formData);
      setOrderId(res.orderId);
      setOrderSuccess(true);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إرسال الطلب');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-900" /></div>;
  }

  if (orderSuccess) {
    return (
      <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h1>
          <p className="text-gray-500 mb-8">رقم الطلب الخاص بك هو #{orderId}. سنقوم بالتواصل معك قريباً لتأكيد موعد التسليم.</p>
          
          <Link href="/" className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const subTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">إتمام الشراء</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold border-b pb-4">بيانات التوصيل</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors"
                  placeholder="مثال: القاهرة"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان بالتفصيل</label>
              <div className="relative">
                <Home className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="shippingAddress"
                  required
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors"
                  placeholder="رقم المبنى، الشارع، المنطقة"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors"
                  placeholder="رقم الهاتف للتواصل"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية (اختياري)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors"
                placeholder="أية ملاحظات إضافية بخصوص الطلب أو التوصيل"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    تأكيد الطلب
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">ملخص الطلب</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center p-1 shrink-0">
                    <img src={getImageUrl(item.product.image)} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 line-clamp-1">{item.product.name}</div>
                    <div className="text-gray-500">{item.quantity} x {item.product.price} ج.م</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-bold">{subTotal} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">رسوم التوصيل</span>
                <span className="text-green-600 font-bold">يحدد لاحقاً</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-extrabold">
                <span>الإجمالي تقريباً</span>
                <span className="text-blue-900">{subTotal} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
