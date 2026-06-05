import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h1>
        <p className="text-gray-500 mb-8">رقم الطلب الخاص بك هو #ORD-2026-8924. سنقوم بالتواصل معك قريباً لتأكيد موعد التسليم.</p>
        
        <a href="/" className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors">
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}
