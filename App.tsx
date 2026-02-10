import { useState, useEffect } from 'react';
import { ITINERARY_DATA, CHECKLIST_DATA, TAXI_CARDS, HOTEL_INFO, SHOPPING_LIST, FLIGHT_INFO } from './constants';
import { ItineraryView } from './components/ItineraryView';
import { ChecklistView } from './components/ChecklistView';
import { InfoView } from './components/InfoView';
import { ShoppingView } from './components/ShoppingView';
import { CalendarDays, CheckSquare, Info, ShoppingBag } from 'lucide-react';

type Tab = 'itinerary' | 'checklist' | 'shopping' | 'info';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800">

      {/* --- Desktop Layout Container --- */}
      <div className="max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row">

        {/* --- Sidebar (Desktop) / Header (Mobile) --- */}
        <aside className="md:w-72 lg:w-80 md:h-screen md:sticky md:top-0 bg-[#FDFBF7] z-20 md:border-r border-stone-200 flex-shrink-0">
          <div className="relative h-64 md:h-2/5 w-full bg-stone-900 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop"
              alt="Kyoto"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white w-full">
              <span className="inline-block px-2 py-1 border border-white/30 rounded text-[10px] tracking-[0.2em] backdrop-blur-md uppercase text-stone-100 mb-3">
                家族旅行 Family Trip
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tighter leading-none">
                KANSAI<br />
                <span className="text-2xl md:text-3xl font-light italic opacity-90">Moments</span>
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-[1px] w-8 md:w-12 bg-emerald-400"></div>
                <p className="text-xs md:text-sm font-serif tracking-widest text-stone-200">
                  KYOTO • Uji • OSAKA • KOBE | 2026.02.16-22
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-col p-6 gap-2">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'itinerary' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              <CalendarDays size={18} />
              <span>行程 <span className="text-xs opacity-60 font-normal">Itinerary</span></span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'checklist' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              <CheckSquare size={18} />
              <span>準備清單 <span className="text-xs opacity-60 font-normal">Checklist</span></span>
            </button>
            <button
              onClick={() => setActiveTab('shopping')}
              className={`text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'shopping' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              <ShoppingBag size={18} />
              <span>必買清單 <span className="text-xs opacity-60 font-normal">Shopping</span></span>
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'info' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              <Info size={18} />
              <span>重要資訊 <span className="text-xs opacity-60 font-normal">Info</span></span>
            </button>

            <div className="mt-auto pt-8 border-t border-stone-100">
              <p className="text-[10px] text-stone-400 text-center">
                Built for the family.<br />Have a safe trip.
              </p>
            </div>
          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1 p-4 pb-24 md:p-8 lg:p-12 md:overflow-y-auto">
          <div className="max-w-2xl mx-auto md:mx-0">
            {activeTab === 'itinerary' && <ItineraryView data={ITINERARY_DATA} />}
            {activeTab === 'checklist' && <ChecklistView initialData={CHECKLIST_DATA} />}
            {activeTab === 'shopping' && <ShoppingView recommendations={SHOPPING_LIST} />}
            {activeTab === 'info' && <InfoView hotelInfo={HOTEL_INFO} taxiCards={TAXI_CARDS} flightInfo={FLIGHT_INFO} />}
          </div>
        </main>
      </div>

      {/* --- Mobile Bottom Navigation --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-stone-200 z-50 pb-safe">
        <div className="flex justify-around p-2 pb-4">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 ${activeTab === 'itinerary' ? 'text-emerald-800' : 'text-stone-400'}`}
          >
            <CalendarDays size={20} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">行程 Schedule</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 ${activeTab === 'checklist' ? 'text-emerald-800' : 'text-stone-400'}`}
          >
            <CheckSquare size={20} strokeWidth={activeTab === 'checklist' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">清單 Checklist</span>
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 ${activeTab === 'shopping' ? 'text-emerald-800' : 'text-stone-400'}`}
          >
            <ShoppingBag size={20} strokeWidth={activeTab === 'shopping' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">購物 Shopping</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 ${activeTab === 'info' ? 'text-emerald-800' : 'text-stone-400'}`}
          >
            <Info size={20} strokeWidth={activeTab === 'info' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">資訊 Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;