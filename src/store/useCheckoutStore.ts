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
  isLoading: true,
  error: null,

  initCheckout: async () => {
    set({ isLoading: true, error: null });
    try {
      const [mainProduct, orderBumps] = await Promise.all([
        productService.getMainProduct(),
        productService.getOrderBumps(),
      ]);

      // Create initial session
      const session = await checkoutService.createSession({
        selected_product_ids: [mainProduct.id],
        source: window.location.search.includes('source') 
          ? new URLSearchParams(window.location.search).get('source') || undefined 
          : undefined,
      });

      set({ 
        mainProduct, 
        orderBumps, 
        sessionId: session.id,
        isLoading: false 
      });
      
      await checkoutService.logEvent(session.id, 'checkout_viewed');
    } catch (err: any) {
      console.error("Failed to init checkout:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  toggleBump: (bumpId: string) => {
    const state = get();
    const isSelected = state.selectedBumpIds.includes(bumpId);
    const newSelectedIds = isSelected
      ? state.selectedBumpIds.filter(id => id !== bumpId)
      : [...state.selectedBumpIds, bumpId];
    
    set({ selectedBumpIds: newSelectedIds });

    // Background log
    if (state.sessionId) {
      const bump = state.orderBumps.find(b => b.id === bumpId);
      checkoutService.logEvent(
        state.sessionId, 
        isSelected ? 'order_bump_removed' : 'order_bump_selected',
        bump?.product_id || undefined
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
