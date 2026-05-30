import { ChevronLeft, Clock, ShoppingBag, Trash2 } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { DELIVERY_TIMES } from '../data/mockData';

export default function Checkout() {
  const cart = useAppStore((s) => s.cart);
  const getCartTotal = useAppStore((s) => s.getCartTotal);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const addToCart = useAppStore((s) => s.addToCart);
  const selectedDeliveryTime = useAppStore((s) => s.selectedDeliveryTime);
  const setDeliveryTime = useAppStore((s) => s.setDeliveryTime);
  const confirmOrder = useAppStore((s) => s.confirmOrder);
  const setView = useAppStore((s) => s.setView);

  const total = getCartTotal();
  const deliveryFee = 25;
  const grandTotal = total + deliveryFee;

  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fcf9f8] border-b border-[#e8ddd9] shadow-[0_2px_8px_rgba(157,61,30,0.07)]">
        <div className="max-w-xl mx-auto px-5 py-4 flex items-center gap-4">
          <button
            onClick={() => setView('home')}
            aria-label="Back to meal browser"
            className="w-[56px] h-[56px] rounded-[8px] border-2 border-[#e8ddd9] flex items-center justify-center text-[#56423c] hover:border-[#9d3d1e] hover:text-[#9d3d1e] transition-colors flex-shrink-0"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-[1.2rem] font-black text-[#1b1c1c] leading-tight">
              Your Order
            </h1>
            <p className="text-[0.78rem] text-[#56423c]">Review before confirming</p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 py-7 space-y-6 pb-40">

        {/* Order Items */}
        <section aria-labelledby="order-items-heading">
          <h2 id="order-items-heading" className="text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-4">
            Items Selected
          </h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 flex items-start justify-between gap-4 shadow-[0_2px_10px_rgba(157,61,30,0.05)]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[0.72rem] font-bold text-[#9d3d1e] uppercase tracking-wide mb-0.5">
                    {item.vendor}
                  </p>
                  <p className="text-[0.95rem] font-black text-[#1b1c1c] leading-snug">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove one ${item.name}`}
                      className="w-[44px] h-[44px] rounded-[6px] border-2 border-[#e8ddd9] text-[#56423c] flex items-center justify-center hover:border-[#9d3d1e] hover:text-[#9d3d1e] active:scale-95 transition-all text-lg font-bold"
                    >
                      −
                    </button>
                    <span className="text-[1rem] font-black text-[#1b1c1c] w-6 text-center tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, vendor: item.vendor })}
                      aria-label={`Add another ${item.name}`}
                      className="w-[44px] h-[44px] rounded-[6px] border-2 border-[#e8ddd9] text-[#56423c] flex items-center justify-center hover:border-[#9d3d1e] hover:text-[#9d3d1e] active:scale-95 transition-all text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[1.1rem] font-black text-[#1b1c1c]">
                    ₹{item.price * item.qty}
                  </p>
                  <p className="text-[0.72rem] text-[#56423c]">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Time */}
        <section aria-labelledby="delivery-time-heading" className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 shadow-[0_2px_10px_rgba(157,61,30,0.05)]">
          <h2 id="delivery-time-heading" className="flex items-center gap-2 text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-4">
            <Clock size={16} />
            Select Delivery Time
          </h2>
          <label htmlFor="delivery-time-select" className="sr-only">Select your preferred delivery time</label>
          <select
            id="delivery-time-select"
            value={selectedDeliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full h-[64px] border-2 border-[#1b1c1c] rounded-[8px] px-5 text-[1rem] font-bold text-[#1b1c1c] bg-white focus:outline-none focus:border-[#9d3d1e] transition-colors appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2356423c' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center' }}
          >
            {DELIVERY_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </section>

        {/* Bill Summary */}
        <section aria-labelledby="bill-summary-heading" className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 shadow-[0_2px_10px_rgba(157,61,30,0.05)]">
          <h2 id="bill-summary-heading" className="text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-4">
            Bill Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-[0.9rem] text-[#56423c]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1b1c1c]">₹{total}</span>
            </div>
            <div className="flex justify-between text-[0.9rem] text-[#56423c]">
              <span>Delivery Fee</span>
              <span className="font-semibold text-[#1b1c1c]">₹{deliveryFee}</span>
            </div>
            <div className="border-t border-[#e8ddd9] pt-3 flex justify-between">
              <span className="text-[1.1rem] font-black text-[#1b1c1c]">Total</span>
              <span className="text-[1.3rem] font-black text-[#9d3d1e]">₹{grandTotal}</span>
            </div>
          </div>
        </section>

        {/* Delivery note */}
        <p className="text-[0.8rem] text-[#56423c] text-center leading-relaxed px-2">
          🏠 Payment is <strong>Cash on Delivery</strong>. Keep ₹{grandTotal} ready for the delivery agent.
        </p>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fcf9f8] border-t border-[#e8ddd9] px-5 py-5 shadow-[0_-4px_20px_rgba(157,61,30,0.10)]">
        <div className="max-w-xl mx-auto">
          <button
            onClick={confirmOrder}
            disabled={cart.length === 0}
            className="w-full h-[68px] rounded-[12px] bg-[#506446] text-white text-[1.1rem] font-black flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(80,100,70,0.35)] hover:bg-[#3e5038] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={22} />
            Confirm Order · ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
}
