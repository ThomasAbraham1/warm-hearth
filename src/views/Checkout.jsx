import { ChevronLeft, Clock, ShoppingBag, CalendarDays, Sunrise, Sun, Moon } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { DELIVERY_TIMES } from '../data/mockData';

// ─── Schedule Duration Options ─────────────────────────────
const DURATION_OPTIONS = [
  { label: 'Today Only', days: 1, sub: 'One-time delivery' },
  { label: '3 Days', days: 3, sub: 'Mon – Wed' },
  { label: '5 Days', days: 5, sub: 'Mon – Fri (Weekdays)' },
  { label: '7 Days', days: 7, sub: 'Full week' },
  { label: '2 Weeks', days: 14, sub: '14 days in a row' },
];

// ─── Meal Slot Config ──────────────────────────────────────
const MEAL_SLOTS = [
  { id: 'breakfast', label: 'Breakfast', emoji: '☀️', time: '~8:30 AM', Icon: Sunrise },
  { id: 'lunch',     label: 'Lunch',     emoji: '🍱', time: '~12:30 PM', Icon: Sun },
  { id: 'dinner',    label: 'Dinner',    emoji: '🌙', time: '~7:30 PM', Icon: Moon },
];

// ─── Sub-components ────────────────────────────────────────

function DurationButton({ option, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(option)}
      aria-pressed={isSelected}
      className={`flex flex-col items-start justify-center w-full px-5 py-4 rounded-[10px] border-2 transition-all duration-150 text-left ${
        isSelected
          ? 'bg-[#9d3d1e] border-[#9d3d1e] shadow-[0_3px_14px_rgba(157,61,30,0.28)]'
          : 'bg-white border-[#e8ddd9] hover:border-[#c4917d]'
      }`}
    >
      <span className={`text-[1rem] font-black leading-tight ${isSelected ? 'text-white' : 'text-[#1b1c1c]'}`}>
        {option.label}
      </span>
      <span className={`text-[0.72rem] font-semibold mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#56423c]'}`}>
        {option.sub}
      </span>
    </button>
  );
}

function MealSlotToggle({ slot, isSelected, onClick }) {
  const { Icon } = slot;
  return (
    <button
      onClick={() => onClick(slot.id)}
      aria-pressed={isSelected}
      className={`flex flex-col items-center justify-center gap-2 flex-1 py-5 rounded-[10px] border-2 transition-all duration-150 ${
        isSelected
          ? 'bg-[#eef2eb] border-[#506446] shadow-[0_2px_10px_rgba(80,100,70,0.18)]'
          : 'bg-white border-[#e8ddd9] hover:border-[#a8bcaa]'
      }`}
    >
      <span className="text-2xl" role="img" aria-label={slot.label}>{slot.emoji}</span>
      <span className={`text-[0.88rem] font-black ${isSelected ? 'text-[#506446]' : 'text-[#1b1c1c]'}`}>
        {slot.label}
      </span>
      <span className={`text-[0.68rem] font-semibold ${isSelected ? 'text-[#506446]' : 'text-[#a09088]'}`}>
        {slot.time}
      </span>
      {isSelected && (
        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#506446] bg-[#d7e2d1] rounded-full px-2.5 py-0.5">
          ✓ Selected
        </span>
      )}
    </button>
  );
}

// ─── Schedule Summary helper ───────────────────────────────
function scheduleSummary(scheduleDays, mealSlots) {
  const slotLabels = MEAL_SLOTS
    .filter((s) => mealSlots.has(s.id))
    .map((s) => s.label);

  if (slotLabels.length === 3) {
    return scheduleDays.days === 1
      ? 'All 3 meals — today'
      : `All 3 meals/day × ${scheduleDays.days} days`;
  }
  const joined = slotLabels.join(' & ');
  return scheduleDays.days === 1
    ? `${joined} — today only`
    : `${joined} × ${scheduleDays.days} days`;
}

// ─── Main Component ────────────────────────────────────────

export default function Checkout() {
  const cart               = useAppStore((s) => s.cart);
  const getCartTotal       = useAppStore((s) => s.getCartTotal);
  const removeFromCart     = useAppStore((s) => s.removeFromCart);
  const addToCart          = useAppStore((s) => s.addToCart);
  const selectedDeliveryTime  = useAppStore((s) => s.selectedDeliveryTime);
  const setDeliveryTime    = useAppStore((s) => s.setDeliveryTime);
  const confirmOrder       = useAppStore((s) => s.confirmOrder);
  const setView            = useAppStore((s) => s.setView);

  // Schedule state
  const scheduleDays       = useAppStore((s) => s.scheduleDays);
  const setScheduleDays    = useAppStore((s) => s.setScheduleDays);
  const mealSlots          = useAppStore((s) => s.mealSlots);
  const toggleMealSlot     = useAppStore((s) => s.toggleMealSlot);
  const setAllMealSlots    = useAppStore((s) => s.setAllMealSlots);
  const getScheduleMultiplier = useAppStore((s) => s.getScheduleMultiplier);

  const itemSubtotal  = getCartTotal();
  const multiplier    = getScheduleMultiplier();
  const subtotal      = itemSubtotal * multiplier;
  const deliveryFee   = scheduleDays.days === 1 ? 25 : scheduleDays.days * 15;
  const grandTotal    = subtotal + deliveryFee;

  const allSelected = mealSlots.size === 3;

  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      {/* ── Header ── */}
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

        {/* ── Order Items ── */}
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
                  <p className="text-[1.1rem] font-black text-[#1b1c1c]">₹{item.price * item.qty}</p>
                  <p className="text-[0.72rem] text-[#56423c]">₹{item.price} × {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Schedule Duration ── */}
        <section
          aria-labelledby="schedule-days-heading"
          className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 shadow-[0_2px_10px_rgba(157,61,30,0.05)]"
        >
          <h2
            id="schedule-days-heading"
            className="flex items-center gap-2 text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-1"
          >
            <CalendarDays size={16} />
            How many days?
          </h2>
          <p className="text-[0.78rem] text-[#56423c] mb-5 leading-relaxed">
            Choose how long you'd like meals delivered to your door.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {DURATION_OPTIONS.map((opt) => (
              <DurationButton
                key={opt.label}
                option={opt}
                isSelected={scheduleDays.label === opt.label}
                onClick={setScheduleDays}
              />
            ))}
          </div>
        </section>

        {/* ── Meal Slots ── */}
        <section
          aria-labelledby="meal-slots-heading"
          className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 shadow-[0_2px_10px_rgba(157,61,30,0.05)]"
        >
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2
              id="meal-slots-heading"
              className="flex items-center gap-2 text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest"
            >
              <Clock size={16} />
              Which meals each day?
            </h2>
            <button
              onClick={setAllMealSlots}
              disabled={allSelected}
              className={`text-[0.7rem] font-bold px-3 py-1.5 rounded-[6px] transition-all border ${
                allSelected
                  ? 'border-[#506446] text-[#506446] bg-[#eef2eb] cursor-default'
                  : 'border-[#9d3d1e] text-[#9d3d1e] bg-[#f9ede8] hover:bg-[#f0dcd4]'
              }`}
            >
              {allSelected ? '✓ All meals' : 'Select all'}
            </button>
          </div>

          <p className="text-[0.78rem] text-[#56423c] mb-5 leading-relaxed">
            Select one or more. You can always skip a meal on any day.
          </p>

          <div className="flex gap-3" role="group" aria-label="Select meal times">
            {MEAL_SLOTS.map((slot) => (
              <MealSlotToggle
                key={slot.id}
                slot={slot}
                isSelected={mealSlots.has(slot.id)}
                onClick={toggleMealSlot}
              />
            ))}
          </div>

          {/* Live summary pill */}
          <div className="mt-5 bg-[#f9ede8] rounded-[8px] px-4 py-3 flex items-center gap-3">
            <span className="text-xl flex-shrink-0">📋</span>
            <p className="text-[0.82rem] font-bold text-[#9d3d1e] leading-snug">
              {scheduleSummary(scheduleDays, mealSlots)}
              <span className="font-semibold text-[#56423c]">
                {' '}— {multiplier} total {multiplier === 1 ? 'delivery' : 'deliveries'}
              </span>
            </p>
          </div>
        </section>

        {/* ── Delivery Time (first delivery) ── */}
        <section
          aria-labelledby="delivery-time-heading"
          className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 shadow-[0_2px_10px_rgba(157,61,30,0.05)]"
        >
          <h2
            id="delivery-time-heading"
            className="flex items-center gap-2 text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-1"
          >
            <Clock size={16} />
            First Delivery Slot
          </h2>
          <p className="text-[0.78rem] text-[#56423c] mb-4 leading-relaxed">
            When should today's first meal arrive?
          </p>
          <label htmlFor="delivery-time-select" className="sr-only">
            Select your preferred first delivery time
          </label>
          <select
            id="delivery-time-select"
            value={selectedDeliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full h-[64px] border-2 border-[#1b1c1c] rounded-[8px] px-5 text-[1rem] font-bold text-[#1b1c1c] bg-white focus:outline-none focus:border-[#9d3d1e] transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2356423c' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1.25rem center',
            }}
          >
            {DELIVERY_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </section>

        {/* ── Bill Summary ── */}
        <section
          aria-labelledby="bill-summary-heading"
          className="bg-white rounded-[12px] border border-[#e8ddd9] p-5 shadow-[0_2px_10px_rgba(157,61,30,0.05)]"
        >
          <h2
            id="bill-summary-heading"
            className="text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-4"
          >
            Bill Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-[0.9rem] text-[#56423c]">
              <span>Meals per day</span>
              <span className="font-semibold text-[#1b1c1c]">₹{itemSubtotal}</span>
            </div>
            {multiplier > 1 && (
              <div className="flex justify-between text-[0.9rem] text-[#56423c]">
                <span>× {multiplier} deliveries</span>
                <span className="font-semibold text-[#1b1c1c]">₹{subtotal}</span>
              </div>
            )}
            <div className="flex justify-between text-[0.9rem] text-[#56423c]">
              <span>Delivery fees</span>
              <span className="font-semibold text-[#1b1c1c]">₹{deliveryFee}</span>
            </div>
            <div className="border-t border-[#e8ddd9] pt-3 flex justify-between">
              <div>
                <span className="text-[1.1rem] font-black text-[#1b1c1c]">Total</span>
                {multiplier > 1 && (
                  <p className="text-[0.7rem] text-[#56423c]">for {scheduleDays.days} days</p>
                )}
              </div>
              <span className="text-[1.3rem] font-black text-[#9d3d1e]">₹{grandTotal}</span>
            </div>
          </div>
        </section>

        {/* Delivery note */}
        <p className="text-[0.8rem] text-[#56423c] text-center leading-relaxed px-2">
          🏠 Payment is <strong>Cash on Delivery</strong>. Keep ₹{grandTotal} ready for the delivery agent.
        </p>
      </main>

      {/* ── Sticky Confirm CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fcf9f8] border-t border-[#e8ddd9] px-5 py-5 shadow-[0_-4px_20px_rgba(157,61,30,0.10)]">
        <div className="max-w-xl mx-auto">
          <button
            onClick={confirmOrder}
            disabled={cart.length === 0}
            className="w-full h-[68px] rounded-[12px] bg-[#506446] text-white text-[1.05rem] font-black flex items-center justify-between px-7 shadow-[0_4px_20px_rgba(80,100,70,0.35)] hover:bg-[#3e5038] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={22} />
              <span>Confirm Order</span>
            </div>
            <span className="text-[1.1rem]">₹{grandTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
