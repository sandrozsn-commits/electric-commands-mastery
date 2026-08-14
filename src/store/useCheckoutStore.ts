import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  compare_at_price?: number;
  description?: string;
  image_url?: string;
  is_main?: boolean;
}

interface CheckoutState {
  mainProduct: Product | null;
  selectedBumps: Product[];
  isLoading: boolean;
  setMainProduct: (product: Product) => void;
  toggleBump: (product: Product) => void;
  setIsLoading: (isLoading: boolean) => void;
  getTotal: () => number;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  mainProduct: {
    id: 'main-book',
    name: 'Livro Comandos Elétricos',
    price: 119.90,
    compare_at_price: 169.90,
    is_main: true,
  },
  selectedBumps: [],
  isLoading: false,
  setMainProduct: (product) => set({ mainProduct: product }),
  toggleBump: (product) => set((state) => {
    const isSelected = state.selectedBumps.find(b => b.id === product.id);
    if (isSelected) {
      return { selectedBumps: state.selectedBumps.filter(b => b.id !== product.id) };
    }
    return { selectedBumps: [...state.selectedBumps, product] };
  }),
  setIsLoading: (isLoading) => set({ isLoading }),
  getTotal: () => {
    const state = get();
    const mainTotal = state.mainProduct?.price || 0;
    const bumpsTotal = state.selectedBumps.reduce((acc, bump) => acc + bump.price, 0);
    return mainTotal + bumpsTotal;
  },
}));
