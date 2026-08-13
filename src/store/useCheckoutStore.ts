import { create } from 'zustand';
import { Product, OrderBump, productService, checkoutService } from '@/services/checkout';

interface CheckoutState {
  mainProduct: Product | null;
  orderBumps: OrderBump[];
  selectedBumpIds: string[];
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initCheckout: () => Promise<void>;
  toggleBump: (bumpId: string) => void;
  getTotal: () => number;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  mainProduct: null,
  orderBumps: [],
  selectedBumpIds: [],
  sessionId: null,
  isLoading: false,
  error: null,

  initCheckout: async () => {
    // Basic guard to prevent multiple simultaneous calls
    if (get().isLoading) return;
    
    // If already have data and a session, we're good
    if (get().mainProduct && get().sessionId) return;

    set({ isLoading: true, error: null });
    
    try {
      console.log("Store: Starting initialization...");
      const [mainProduct, orderBumps] = await Promise.all([
        productService.getMainProduct(),
        productService.getOrderBumps(),
      ]);
      
      console.log("Store: Fetched", orderBumps.length, "bumps");

      const session = await checkoutService.createSession({
        selected_product_ids: [mainProduct.id],
        source: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('source') : null,
      });

      set({ 
        mainProduct, 
        orderBumps, 
        sessionId: session.id,
        isLoading: false 
      });
      
      await checkoutService.logEvent(session.id, 'checkout_viewed');
    } catch (err: any) {
      console.error("Store: Initialization error", err);
      set({ error: err.message || "Falha ao carregar checkout", isLoading: false });
    }
  },

  toggleBump: (bumpId: string) => {
    const state = get();
    const isSelected = state.selectedBumpIds.includes(bumpId);
    const newSelectedIds = isSelected
      ? state.selectedBumpIds.filter(id => id !== bumpId)
      : [...state.selectedBumpIds, bumpId];
    
    set({ selectedBumpIds: newSelectedIds });

    if (state.sessionId) {
      const bump = state.orderBumps.find(b => b.id === bumpId);
      checkoutService.logEvent(
        state.sessionId, 
        isSelected ? 'order_bump_removed' : 'order_bump_selected',
        bump?.product_id ?? null
      );
    }
  },

  getTotal: () => {
    const state = get();
    let total = state.mainProduct?.price || 0;
    
    state.selectedBumpIds.forEach(bumpId => {
      const bump = state.orderBumps.find(b => b.id === bumpId);
      if (bump) {
        total += bump.bump_price;
      }
    });
    
    return total;
  },
}));
