import { useState } from 'react';
import { ShoppingBag, MapPin, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { MOCK_MEALS } from '../data/mockData';

const CHIP_BG = {
  '#506446': 'bg-[#eef2eb] text-[#506446]',
  '#9d3d1e': 'bg-[#f9ede8] text-[#9d3d1e]',
  '#4a6b8a': 'bg-[#eaf0f5] text-[#4a6b8a]',
  '#7a5c3e': 'bg-[#f3ede7] text-[#7a5c3e]',
};

function DietaryChip({ label, color }) {
  const cls = CHIP_BG[color] || 'bg-[#f0ece8] text-[#56423c]';
  return (
    <span className={`inline-block text-[0.68rem] font-bold uppercase tracking-wide px-3 py-1.5 rounded-[6px] ${cls}`}>
      {label}
    </span>
  );
}

function MealCard({ meal }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const cart = useAppStore((s) => s.cart);
  const cartItem = cart.find((c) => c.id === meal.id);
  const qty = cartItem?.qty || 0;

  const [imgError, setImgError] = useState(false);

  return (
    <article className="bg-[#fff8f5] rounded-[16px] border border-[#e8ddd9] shadow-[0_2px_16px_rgba(157,61,30,0.07)] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden bg-[#f0e8e4] flex-shrink-0">
        {!imgError ? (
          <img
            src={meal.image}
            alt={meal.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍱
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 rounded-[6px] px-2.5 py-1 text-[0.7rem] font-bold text-[#56423c] shadow-sm">
          {meal.mealTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[0.72rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-1">
          {meal.vendorName}
        </p>
        <h3 className="text-[1.1rem] font-black text-[#1b1c1c] leading-snug mb-2">
          {meal.name}
        </h3>
        <p className="text-[0.82rem] text-[#56423c] leading-relaxed mb-4 flex-1">
          {meal.description}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {meal.chips.map((chip, i) => (
            <DietaryChip key={chip} label={chip} color={meal.chipColors[i]} />
          ))}
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[1.4rem] font-black text-[#1b1c1c]">
            ₹{meal.price}
          </span>

          {qty === 0 ? (
            <button
              onClick={() =>
                addToCart({
                  id: meal.id,
                  name: meal.name,
                  price: meal.price,
                  vendor: meal.vendorName,
                })
              }
              aria-label={`Add ${meal.name} to order`}
              className="flex items-center gap-2 h-[56px] px-6 rounded-[8px] bg-[#9d3d1e] text-white font-bold text-[0.9rem] shadow-[0_3px_12px_rgba(157,61,30,0.28)] hover:bg-[#7d3118] active:scale-[0.97] transition-all"
            >
              <Plus size={18} />
              Add to Order
            </button>
          ) : (
            <div className="flex items-center gap-3 h-[56px]">
              <button
                onClick={() => removeFromCart(meal.id)}
                aria-label={`Remove one ${meal.name}`}
                className="w-[56px] h-[56px] rounded-[8px] border-2 border-[#9d3d1e] text-[#9d3d1e] flex items-center justify-center hover:bg-[#f9ede8] active:scale-95 transition-all"
              >
                <Minus size={20} />
              </button>
              <span className="text-[1.3rem] font-black text-[#1b1c1c] w-8 text-center tabular-nums">
                {qty}
              </span>
              <button
                onClick={() =>
                  addToCart({
                    id: meal.id,
                    name: meal.name,
                    price: meal.price,
                    vendor: meal.vendorName,
                  })
                }
                aria-label={`Add another ${meal.name}`}
                className="w-[56px] h-[56px] rounded-[8px] bg-[#9d3d1e] text-white flex items-center justify-center hover:bg-[#7d3118] active:scale-95 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const userLocation = useAppStore((s) => s.userLocation);
  const cart = useAppStore((s) => s.cart);
  const getCartTotal = useAppStore((s) => s.getCartTotal);
  const getCartCount = useAppStore((s) => s.getCartCount);
  const setView = useAppStore((s) => s.setView);

  const [filter, setFilter] = useState('All');
  const FILTERS = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  const filtered = MOCK_MEALS.filter((m) => {
    if (filter === 'All') return true;
    return m.mealTime.includes(filter);
  });

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fcf9f8] border-b border-[#e8ddd9] shadow-[0_2px_8px_rgba(157,61,30,0.07)]">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-bold text-[#9d3d1e] uppercase tracking-widest">Warm Hearth</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin size={14} className="text-[#56423c] flex-shrink-0" />
              <span className="text-[0.82rem] font-semibold text-[#1b1c1c] truncate">
                {userLocation?.area || 'Your area'}
              </span>
            </div>
          </div>

          {cartCount > 0 && (
            <button
              onClick={() => setView('checkout')}
              aria-label={`View cart – ${cartCount} items, ₹${cartTotal}`}
              className="flex items-center gap-2.5 h-[56px] px-5 rounded-[8px] bg-[#9d3d1e] text-white font-bold text-[0.9rem] shadow-[0_3px_14px_rgba(157,61,30,0.28)] hover:bg-[#7d3118] active:scale-[0.97] transition-all flex-shrink-0"
            >
              <ShoppingBag size={20} />
              <span>{cartCount}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">₹{cartTotal}</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <div className="max-w-2xl mx-auto px-5 pt-7 pb-2">
        <h1 className="text-[1.6rem] font-black text-[#1b1c1c] leading-tight">
          Today's Meal Plans 🍽️
        </h1>
        <p className="text-[0.9rem] text-[#56423c] mt-1 leading-relaxed">
          Fresh, home-cooked meals from trusted neighbours in{' '}
          <strong>{userLocation?.area?.split(',')[0]}</strong>.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-2xl mx-auto px-5 mt-5">
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filter meals by time">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`flex-shrink-0 h-[48px] px-6 rounded-[8px] text-[0.88rem] font-bold transition-all border-2 ${
                filter === f
                  ? 'bg-[#9d3d1e] text-white border-[#9d3d1e] shadow-[0_3px_10px_rgba(157,61,30,0.25)]'
                  : 'bg-white text-[#56423c] border-[#e8ddd9] hover:border-[#9d3d1e] hover:text-[#9d3d1e]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Cards Grid */}
      <main className="max-w-2xl mx-auto px-5 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </main>

      {/* Floating Cart CTA (mobile) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-5 z-50">
          <button
            onClick={() => setView('checkout')}
            className="w-full max-w-sm h-[64px] rounded-[12px] bg-[#9d3d1e] text-white font-black text-[1rem] flex items-center justify-between px-7 shadow-[0_8px_32px_rgba(157,61,30,0.38)] hover:bg-[#7d3118] active:scale-[0.97] transition-all sm:hidden"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={22} />
              <span>{cartCount} item{cartCount > 1 ? 's' : ''}</span>
            </div>
            <span>₹{cartTotal} · View Order →</span>
          </button>
        </div>
      )}
    </div>
  );
}
