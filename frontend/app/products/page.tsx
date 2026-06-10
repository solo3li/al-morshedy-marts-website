'use client';

import { useEffect, useState, Suspense } from 'react';
import { Filter, Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '../../src/components/ProductCard';
import { fetchApi } from '../../src/utils/api';

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const categoryIdParam = searchParams.get('categoryId');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryIdParam || '');
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [sortParam, setSortParam] = useState<string>(searchParams.get('sort') || 'default');

  useEffect(() => {
    // Sync states from URL
    setSelectedCategory(searchParams.get('categoryId') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSearchQuery(searchParams.get('search') || '');
    setSortParam(searchParams.get('sort') || 'default');
    
    loadProducts();
  }, [searchParams]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchApi('/categories');
      setCategories(data);
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const params = new URLSearchParams();
      if (searchParams.get('categoryId')) params.append('categoryId', searchParams.get('categoryId') as string);
      if (searchParams.get('minPrice')) params.append('minPrice', searchParams.get('minPrice') as string);
      if (searchParams.get('maxPrice')) params.append('maxPrice', searchParams.get('maxPrice') as string);
      if (searchParams.get('search')) params.append('search', searchParams.get('search') as string);
      if (searchParams.get('sort') && searchParams.get('sort') !== 'default') params.append('sort', searchParams.get('sort') as string);

      const endpoint = `/Products${params.toString() ? '?' + params.toString() : ''}`;
      const data = await fetchApi(endpoint);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل المنتجات.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.append('categoryId', selectedCategory);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (searchQuery) params.append('search', searchQuery);
    if (sortParam && sortParam !== 'default') params.append('sort', sortParam);

    router.push(`/products?${params.toString()}`);
    setIsMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    setSortParam('default');
    router.push('/products');
    setIsMobileFilterOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortParam(newSort);
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    router.push(`/products?${params.toString()}`);
  };

  const renderSidebar = () => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-fit">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-red-600" />
          تصفية المنتجات
        </h3>
        {isMobileFilterOpen && (
          <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">بحث</label>
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن منتج..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">الفئات</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="category" 
              value="" 
              checked={selectedCategory === ''}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-4 h-4 text-red-600 focus:ring-red-500"
            />
            <span className="text-gray-600 group-hover:text-red-600 transition-colors">الكل</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="category" 
                value={cat.id.toString()} 
                checked={selectedCategory === cat.id.toString()}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-600 group-hover:text-red-600 transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">نطاق السعر (ج.م)</label>
        <div className="flex items-center gap-3">
          <input 
            type="number" 
            placeholder="من"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          />
          <span className="text-gray-400">-</span>
          <input 
            type="number" 
            placeholder="إلى"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button 
          onClick={applyFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          تطبيق الفلاتر
        </button>
        <button 
          onClick={clearFilters}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2.5 rounded-lg transition-colors"
        >
          إعادة ضبط
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto mb-16 relative">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">جميع المنتجات</h1>
          <p className="text-gray-500">تصفح أحدث وأفضل الأدوات المنزلية لدينا</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600 transition"
          >
            <Filter className="w-5 h-5" />
            تصفية
          </button>
          <select 
            value={sortParam}
            onChange={handleSortChange}
            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="default">الترتيب الافتراضي</option>
            <option value="newest">الأحدث</option>
            <option value="price_asc">السعر: من الأقل للأعلى</option>
            <option value="price_desc">السعر: من الأعلى للأقل</option>
          </select>
        </div>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileFilterOpen(false)}></div>
        )}

        {/* Sidebar Filter (Desktop + Mobile) */}
        <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:w-1/4 lg:z-auto ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="h-full overflow-y-auto lg:h-auto lg:overflow-visible">
            {renderSidebar()}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4">
          {/* Desktop Top Bar (Sort) */}
          <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
            <span className="text-sm font-semibold text-gray-600">
              {isLoading ? 'جاري التحميل...' : `عرض ${products.length} منتج`}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">ترتيب حسب:</span>
              <select 
                value={sortParam}
                onChange={handleSortChange}
                className="border border-gray-300 py-1.5 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
              >
                <option value="default">الافتراضي</option>
                <option value="newest">الأحدث</option>
                <option value="price_asc">السعر: الأقل للأعلى</option>
                <option value="price_desc">السعر: الأعلى للأقل</option>
              </select>
            </div>
          </div>

          {isLoading ? (
             <div className="flex justify-center items-center py-32">
               <Loader2 className="w-12 h-12 animate-spin text-red-600" />
             </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center font-medium border border-red-100">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-32 px-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">لا توجد منتجات مطابقة</h3>
              <p className="text-gray-500 max-w-md">لم نعثر على أي منتجات تطابق معايير البحث والفلترة الخاصة بك. جرب تغيير بعض الفلاتر أو البحث بكلمات أخرى.</p>
              <button 
                onClick={clearFilters}
                className="mt-6 text-red-600 font-bold hover:text-red-700 transition"
              >
                إزالة جميع الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
