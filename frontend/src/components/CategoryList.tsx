import * as Icons from 'lucide-react';

interface CategoryListProps {
  categories: any[];
}

export function CategoryList({ categories }: CategoryListProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-8 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-r-4 border-red-600 pr-2">
          تسوق حسب الفئة
        </h3>
        
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 scrollbar-hide">
          {categories.map((category) => {
            // Dynamically get the icon component from lucide-react
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ElementType;
            
            return (
              <div 
                key={category.id} 
                className="flex flex-col items-center flex-shrink-0 cursor-pointer group w-24 md:w-32"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-red-500 transition-colors shadow-sm relative flex items-center justify-center bg-gray-50 mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                  />
                  {IconComponent && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                       <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md z-10" />
                    </div>
                  )}
                </div>
                <span className="text-sm md:text-base font-medium text-gray-700 text-center group-hover:text-red-600 transition-colors">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
