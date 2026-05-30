import { useEffect } from 'react';
import useAppStore from './store/useAppStore';
import LocationGate from './views/LocationGate';
import Home from './views/Home';
import Checkout from './views/Checkout';
import Tracking from './views/Tracking';

/**
 * Warm Hearth – Root Application
 * Routes between the 4 views based on Zustand state.
 */
export default function App() {
  const currentView = useAppStore((s) => s.currentView);

  // Scroll to top on every view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen font-['Nunito',sans-serif]" id="app-root">
      {currentView === 'location-gate' && <LocationGate />}
      {currentView === 'home' && <Home />}
      {currentView === 'checkout' && <Checkout />}
      {currentView === 'tracking' && <Tracking />}
    </div>
  );
}
