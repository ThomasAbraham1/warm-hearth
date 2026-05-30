import { useEffect } from 'react';
import { Phone, CheckCircle2, Circle, Clock, ChefHat, Bike } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const MILESTONES = [
  {
    step: 0,
    label: 'Order Placed',
    sub: 'Your order has been received.',
    icon: CheckCircle2,
  },
  {
    step: 1,
    label: 'Kitchen Accepted',
    sub: 'The cook has accepted your order.',
    icon: ChefHat,
  },
  {
    step: 2,
    label: 'Preparing',
    sub: 'Your meal is being freshly prepared.',
    icon: Clock,
  },
  {
    step: 3,
    label: 'Out for Delivery',
    sub: 'Your meal is on its way to you.',
    icon: Bike,
  },
  {
    step: 4,
    label: 'Delivered 🎉',
    sub: 'Enjoy your warm home-cooked meal!',
    icon: CheckCircle2,
  },
];

const DELIVERY_AGENT = {
  name: 'Ramesh Bhai',
  phone: '+91 98765 43210',
  vehicle: 'Hero Splendor • MH04 AB 1234',
};

export default function Tracking() {
  const orderStatus = useAppStore((s) => s.orderStatus);
  const advanceOrderStatus = useAppStore((s) => s.advanceOrderStatus);
  const selectedDeliveryTime = useAppStore((s) => s.selectedDeliveryTime);
  const setView = useAppStore((s) => s.setView);

  // Auto-advance order status for demo purposes
  useEffect(() => {
    if (orderStatus >= 4) return;
    const timer = setTimeout(() => {
      advanceOrderStatus();
    }, 4000);
    return () => clearTimeout(timer);
  }, [orderStatus, advanceOrderStatus]);

  const handleCallAgent = () => {
    alert(`📞 Calling ${DELIVERY_AGENT.name}\n${DELIVERY_AGENT.phone}\n\nThis is a demo – no real call is placed.`);
  };

  const progressPercent = (orderStatus / (MILESTONES.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      {/* Header */}
      <header className="bg-[#fcf9f8] border-b border-[#e8ddd9] shadow-[0_2px_8px_rgba(157,61,30,0.07)]">
        <div className="max-w-xl mx-auto px-5 py-5">
          <p className="text-[0.68rem] font-bold text-[#9d3d1e] uppercase tracking-widest">Warm Hearth</p>
          <h1 className="text-[1.4rem] font-black text-[#1b1c1c] leading-tight mt-0.5">
            Order Status
          </h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 py-7 space-y-7">

        {/* Status Banner */}
        <div className={`rounded-[14px] p-6 text-center transition-all duration-500 ${
          orderStatus >= 4
            ? 'bg-[#eef2eb] border-2 border-[#506446]'
            : 'bg-[#f9ede8] border-2 border-[#e8cec6]'
        }`}>
          <p className="text-[2.5rem] mb-2" role="img" aria-label={MILESTONES[orderStatus].label}>
            {orderStatus === 0 ? '📋' : orderStatus === 1 ? '✅' : orderStatus === 2 ? '🍳' : orderStatus === 3 ? '🛵' : '🎉'}
          </p>
          <h2 className="text-[1.3rem] font-black text-[#1b1c1c] leading-tight">
            {MILESTONES[orderStatus].label}
          </h2>
          <p className="text-[0.88rem] text-[#56423c] mt-1">
            {MILESTONES[orderStatus].sub}
          </p>
          {orderStatus < 4 && (
            <p className="text-[0.78rem] text-[#56423c] mt-3 opacity-70">
              Estimated delivery: <strong>{selectedDeliveryTime}</strong>
            </p>
          )}
        </div>

        {/* Progress Tracker */}
        <section aria-labelledby="tracker-heading" className="bg-white rounded-[14px] border border-[#e8ddd9] p-6 shadow-[0_2px_12px_rgba(157,61,30,0.06)]">
          <h2 id="tracker-heading" className="text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-6">
            Order Journey
          </h2>

          {/* Linear progress bar */}
          <div className="relative mb-8" aria-hidden="true">
            <div className="h-[6px] bg-[#e8ddd9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#506446] rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Step list */}
          <ol className="space-y-5">
            {MILESTONES.map((m) => {
              const completed = orderStatus > m.step;
              const active = orderStatus === m.step;
              const Icon = m.icon;

              return (
                <li
                  key={m.step}
                  className={`flex items-start gap-4 transition-opacity duration-300 ${
                    completed || active ? 'opacity-100' : 'opacity-40'
                  }`}
                  aria-current={active ? 'step' : undefined}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    completed
                      ? 'bg-[#506446] border-[#506446]'
                      : active
                      ? 'bg-[#9d3d1e] border-[#9d3d1e] ring-4 ring-[#f9ede8]'
                      : 'bg-white border-[#e8ddd9]'
                  }`}>
                    <Icon
                      size={18}
                      className={completed || active ? 'text-white' : 'text-[#c4a89f]'}
                    />
                  </div>
                  <div className="pt-1">
                    <p className={`text-[0.9rem] font-bold leading-tight ${active ? 'text-[#9d3d1e]' : completed ? 'text-[#506446]' : 'text-[#1b1c1c]'}`}>
                      {m.label}
                    </p>
                    {(completed || active) && (
                      <p className="text-[0.78rem] text-[#56423c] mt-0.5">{m.sub}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Delivery Agent Card */}
        {orderStatus >= 3 && orderStatus < 4 && (
          <section
            aria-labelledby="agent-heading"
            className="bg-white rounded-[14px] border border-[#e8ddd9] p-6 shadow-[0_2px_12px_rgba(157,61,30,0.06)] animate-[fadeIn_0.5s_ease]"
          >
            <h2 id="agent-heading" className="text-[0.8rem] font-bold text-[#9d3d1e] uppercase tracking-widest mb-4">
              Your Delivery Agent
            </h2>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#f0e8e4] flex items-center justify-center text-2xl flex-shrink-0">
                👨‍🦱
              </div>
              <div>
                <p className="text-[1rem] font-black text-[#1b1c1c]">{DELIVERY_AGENT.name}</p>
                <p className="text-[0.78rem] text-[#56423c]">{DELIVERY_AGENT.vehicle}</p>
              </div>
            </div>
            <button
              onClick={handleCallAgent}
              className="w-full h-[68px] rounded-[10px] bg-[#506446] text-white font-black text-[1.05rem] flex items-center justify-center gap-3 shadow-[0_4px_18px_rgba(80,100,70,0.30)] hover:bg-[#3e5038] active:scale-[0.98] transition-all"
            >
              <Phone size={22} />
              Call Delivery Agent
            </button>
          </section>
        )}

        {/* Order again */}
        {orderStatus >= 4 && (
          <div className="text-center py-4">
            <p className="text-[0.88rem] text-[#56423c] mb-4">We hope you enjoyed your meal! 🙏</p>
            <button
              onClick={() => setView('home')}
              className="h-[60px] px-10 rounded-[10px] bg-[#9d3d1e] text-white font-bold text-[0.95rem] shadow-[0_3px_14px_rgba(157,61,30,0.28)] hover:bg-[#7d3118] active:scale-[0.97] transition-all"
            >
              Order Again
            </button>
          </div>
        )}

        {/* Demo note */}
        {orderStatus < 4 && (
          <p className="text-center text-[0.72rem] text-[#b0a09a] leading-relaxed">
            📌 Demo mode: Status advances automatically every 4 seconds.
          </p>
        )}
      </main>
    </div>
  );
}
