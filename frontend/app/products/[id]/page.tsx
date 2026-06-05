import { ShoppingCart, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetailsPage() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-l border-gray-100">
          <div className="aspect-square rounded-lg bg-gray-50 mb-4 flex items-center justify-center p-8">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" 
              alt="Product" 
              className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-md bg-gray-50 border-2 border-transparent hover:border-red-500 cursor-pointer overflow-hidden p-2">
                 <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=200&q=80" 
                  alt={`Thumb ${i}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">عرض خاص</span>
            <span className="text-gray-500 text-sm">أجهزة المطبخ</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            عجانة كهربائية متعددة الوظائف 1000 واط مع وعاء 5 لتر - ستانلس ستيل
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-5 h-5 ${i === 5 ? 'fill-transparent text-gray-300' : 'fill-current'}`} />
              ))}
            </div>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">(124 تقييم)</span>
          </div>

          <div className="text-4xl font-extrabold text-red-600 mb-2">
            4,999 <span className="text-xl font-medium">ج.م</span>
          </div>
          <div className="text-sm text-gray-500 line-through mb-6">5,500 ج.م</div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            عجانة احترافية تساعدك على تحضير أشهى المخبوزات والحلويات بكل سهولة. تتميز بمحرك قوي 1000 واط ووعاء سعة 5 لتر من الستانلس ستيل المقاوم للصدأ.
          </p>

          <div className="flex gap-4 mb-8">
            <div className="w-24 md:w-32 flex border border-gray-300 rounded-lg overflow-hidden">
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-lg font-medium transition-colors">-</button>
              <div className="flex-1 flex items-center justify-center font-bold border-x border-gray-300">1</div>
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-lg font-medium transition-colors">+</button>
            </div>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-red-600/30">
              <ShoppingCart className="w-5 h-5" />
              أضف للسلة
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-gray-400">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-green-600" />
              ضمان لمدة عامين
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-blue-600" />
              شحن مجاني للطلبات فوق 1000 ج.م
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5 text-orange-500" />
              استرجاع مجاني خلال 14 يوم
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
