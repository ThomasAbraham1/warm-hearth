import { create } from 'zustand';

/**
 * Warm Hearth – Zustand Store
 * Manages all prototype state for the 4-view customer flow.
 */
const useAppStore = create((set, get) => ({
  // ─── Navigation ───────────────────────────────────────────
  currentView: 'location-gate', // 'location-gate' | 'home' | 'checkout' | 'tracking'

  setView: (view) => set({ currentView: view }),

  // ─── Location ─────────────────────────────────────────────
  userLocation: null, // { pincode, area }

  setUserLocation: (location) =>
    set({ userLocation: location, currentView: 'home' }),

  // ─── Cart ─────────────────────────────────────────────────
  cart: [], // [{ id, name, price, qty, vendor }]

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart
        .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0),
    })),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.qty, 0);
  },

  // ─── Order / Tracking ─────────────────────────────────────
  selectedDeliveryTime: 'Lunch – 12:30 PM',

  setDeliveryTime: (time) => set({ selectedDeliveryTime: time }),

  // ─── Schedule ─────────────────────────────────────────────
  // scheduleDays: { label, days } – how many days the plan runs
  scheduleDays: { label: 'Today Only', days: 1 },

  setScheduleDays: (option) => set({ scheduleDays: option }),

  // mealSlots: Set of selected meal times ('breakfast' | 'lunch' | 'dinner')
  mealSlots: new Set(['lunch']),

  toggleMealSlot: (slot) =>
    set((state) => {
      const next = new Set(state.mealSlots);
      if (next.has(slot) && next.size === 1) return {}; // keep at least one
      next.has(slot) ? next.delete(slot) : next.add(slot);
      return { mealSlots: next };
    }),

  setAllMealSlots: () =>
    set({ mealSlots: new Set(['breakfast', 'lunch', 'dinner']) }),

  // Returns how many total meal deliveries the schedule represents
  getScheduleMultiplier: () => {
    const { scheduleDays, mealSlots } = get();
    return scheduleDays.days * mealSlots.size;
  },

  // 0: Placed | 1: Accepted | 2: Preparing | 3: Out for Delivery | 4: Delivered
  orderStatus: 0,

  confirmOrder: () =>
    set({ currentView: 'tracking', orderStatus: 0, cart: [] }),

  advanceOrderStatus: () =>
    set((state) => ({
      orderStatus: Math.min(state.orderStatus + 1, 4),
    })),
}));

export default useAppStore;
