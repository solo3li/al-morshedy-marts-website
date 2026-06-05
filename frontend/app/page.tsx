import { HeroSlider } from '../src/components/HeroSlider';
import { CategoryList } from '../src/components/CategoryList';
import { ProductSection } from '../src/components/ProductSection';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryList />
      
      {/* Promotional Banner between sections */}
      <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="rounded-lg overflow-hidden relative h-32 md:h-48 cursor-pointer shadow-sm group">
          <img 
            src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1200&q=80" 
            alt="Promo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-red-600/80 to-transparent flex items-center rtl:bg-gradient-to-r rtl:from-red-600/80 rtl:to-transparent">
            <div className="text-white px-8">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">خصومات إضافية 10%</h3>
              <p className="text-sm md:text-base font-medium">استخدم الكود EXTRA10 عند الدفع</p>
            </div>
          </div>
        </div>
      </section>

      <ProductSection title="وصل حديثاً" />
      <ProductSection title="الأكثر مبيعاً" />
    </>
  );
}
