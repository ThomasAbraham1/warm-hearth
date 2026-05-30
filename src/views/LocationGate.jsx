import { useState } from 'react';
import { MapPin, ArrowRight, Info } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { SERVICE_PINCODES } from '../data/mockData';

const KNOWN_AREAS = {
  '400001': 'Churchgate, Mumbai',
  '400092': 'Malad East, Mumbai',
  '400066': 'Borivali West, Mumbai',
  '400091': 'Kandivali East, Mumbai',
  '400064': 'Goregaon West, Mumbai',
  '600017': 'T. Nagar, Chennai',
  '600014': 'Mylapore, Chennai',
  '600035': 'Adyar, Chennai',
  '600040': 'Velachery, Chennai',
  '110027': 'Rajouri Garden, Delhi',
  '110031': 'Preet Vihar, Delhi',
  '110058': 'Janakpuri, Delhi',
  '110047': 'Munirka, Delhi',
  '560001': 'MG Road, Bangalore',
  '560011': 'Malleswaram, Bangalore',
  '560038': 'Koramangala, Bangalore',
  '411001': 'Shivajinagar, Pune',
  '411014': 'Aundh, Pune',
  '411030': 'Hadapsar, Pune',
};

export default function LocationGate() {
  const setUserLocation = useAppStore((s) => s.setUserLocation);
  const [pincode, setPincode] = useState('400066');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleCheck = () => {
    const trimmed = pincode.trim();
    if (!trimmed) {
      setError('Please enter your pincode or area name.');
      return;
    }
    if (trimmed.length !== 6 || !/^\d+$/.test(trimmed)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    setChecking(true);
    setError('');

    // Simulate a brief network check
    setTimeout(() => {
      if (SERVICE_PINCODES.includes(trimmed)) {
        setUserLocation({
          pincode: trimmed,
          area: KNOWN_AREAS[trimmed] || `Area – ${trimmed}`,
        });
      } else {
        setError(
          'We\'re not in your area yet. Try: 400066, 600017, 110027, or 560001.'
        );
        setChecking(false);
      }
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCheck();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#fcf9f8]">
      {/* Brand */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[16px] bg-[#9d3d1e] mb-5 shadow-lg">
          <span className="text-4xl" role="img" aria-label="flame">🍲</span>
        </div>
        <h1 className="text-[2rem] font-black text-[#1b1c1c] leading-tight tracking-tight">
          Warm Hearth
        </h1>
        <p className="text-[1rem] text-[#56423c] mt-1 font-semibold">
          Home-cooked meals, delivered with love.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-[16px] p-8 shadow-[0_4px_32px_rgba(157,61,30,0.10)] border border-[#e8ddd9]">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={28} className="text-[#9d3d1e] flex-shrink-0" />
          <h2 className="text-[1.3rem] font-bold text-[#1b1c1c] leading-snug">
            Where should we deliver?
          </h2>
        </div>

        <p className="text-[0.9rem] text-[#56423c] mb-6 leading-relaxed">
          Enter your 6-digit <strong>PIN code</strong> to check if home-cooked
          meals are available in your neighbourhood.
        </p>

        <label htmlFor="pincode-input" className="block text-[0.85rem] font-bold text-[#56423c] mb-2 uppercase tracking-wide">
          Your Pincode
        </label>
        <input
          id="pincode-input"
          type="tel"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 400066"
          aria-label="Enter your 6-digit pincode"
          aria-describedby={error ? 'pincode-error' : undefined}
          className="w-full h-[64px] border-2 border-[#1b1c1c] rounded-[8px] px-5 text-[1.2rem] font-bold text-[#1b1c1c] placeholder-[#b0a09a] focus:outline-none focus:border-[#9d3d1e] transition-colors"
        />

        {error && (
          <div id="pincode-error" role="alert" className="flex items-start gap-2 mt-3 text-[#9d3d1e]">
            <Info size={18} className="flex-shrink-0 mt-0.5" />
            <p className="text-[0.85rem] font-semibold leading-snug">{error}</p>
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={checking}
          aria-busy={checking}
          className="w-full mt-6 h-[64px] rounded-[8px] bg-[#9d3d1e] text-white text-[1.1rem] font-bold flex items-center justify-center gap-3 shadow-[0_4px_16px_rgba(157,61,30,0.30)] hover:bg-[#7d3118] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {checking ? (
            <>
              <span className="animate-spin text-xl">⏳</span>
              Checking…
            </>
          ) : (
            <>
              Check My Area
              <ArrowRight size={22} />
            </>
          )}
        </button>

        <p className="text-center text-[0.75rem] text-[#56423c] mt-5 leading-relaxed">
          You can change the pincode above if needed.
        </p>
      </div>

      {/* Footer tagline */}
      <p className="mt-10 text-[0.8rem] text-[#b0a09a] text-center">
        Made with care · TechScepter Agency
      </p>
    </div>
  );
}
