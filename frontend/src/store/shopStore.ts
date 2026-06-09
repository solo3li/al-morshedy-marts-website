import { create } from 'zustand';
import { fetchApi } from '../utils/api';

interface Category {
  id: number;
  name: string;
  image: string;
  icon?: string;
}

interface ShopState {
  cartCount: number;
  favoritesCount: number;
  categories: Category[];
  fetchCartCount: () => Promise<void>;
  fetchFavoritesCount: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  incrementCart: () => void;
  incrementFavorites: () => void;
  decrementCart: () => void;
  decrementFavorites: () => void;
  setCartCount: (count: number) => void;
  setFavoritesCount: (count: number) => void;
}

export const useShopStore = create<ShopState>((set) => ({
  cartCount: 0,
  favoritesCount: 0,
  categories: [],
  
  fetchCartCount: async () => {
    try {
      const items = await fetchApi('/cart');
      set({ cartCount: Array.isArray(items) ? items.length : 0 });
    } catch (e) {
      console.error(e);
    }
  },

  fetchFavoritesCount: async () => {
    try {
      const items = await fetchApi('/favorites');
      set({ favoritesCount: Array.isArray(items) ? items.length : 0 });
    } catch (e) {
      console.error(e);
    }
  },

  fetchCategories: async () => {
    try {
      const data = await fetchApi('/categories');
      set({ categories: Array.isArray(data) ? data : [] });
    } catch (e) {
      console.error(e);
    }
  },

  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  incrementFavorites: () => set((state) => ({ favoritesCount: state.favoritesCount + 1 })),
  decrementCart: () => set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
  decrementFavorites: () => set((state) => ({ favoritesCount: Math.max(0, state.favoritesCount - 1) })),
  setCartCount: (count) => set({ cartCount: count }),
  setFavoritesCount: (count) => set({ favoritesCount: count }),
}));
