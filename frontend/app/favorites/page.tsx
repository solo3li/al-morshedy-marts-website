'use client';

import { useEffect, useState } from 'react';
import { ProductSection } from '../../src/components/ProductSection';
import { Heart, Loader2 } from 'lucide-react';
import { fetchApi } from '../../src/utils/api';
import { useAuthStore } from '../../src/store/authStore';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      const data = await fetchApi('/favorites');
      setFavorites(data || []);
    } catch (error) {
      console.error('Error loading favorites', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">يرجى تسجيل الدخول لعرض المفضلة</h2>
        <Link href="/login" className="bg-rose-600 text-white px-6 py-2 rounded-lg inline-block">تسجيل الدخول</Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-rose-600" /></div>;
  }

  const products = favorites.map(f => f.product);

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto min-h-[60vh]">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="w-8 h-8 text-rose-600 fill-rose-600" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">المفضلة</h1>
          <p className="text-gray-500">المنتجات التي قمت بحفظها لوقت لاحق</p>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4">المفضلة فارغة</h2>
          <Link href="/products" className="text-rose-600 font-medium hover:underline">استكشف المنتجات</Link>
        </div>
      ) : (
        <ProductSection title="" products={products} />
      )}
    </div>
  );
}
