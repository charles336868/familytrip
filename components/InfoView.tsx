import { useState } from 'react';
import { TaxiCardData, HotelData, FlightInfo } from '../types';
import { Phone, MapPin, Copy, ExternalLink, Car, Hotel, Plane, Maximize2, X } from 'lucide-react';

interface InfoViewProps {
    hotelInfo: HotelData[];
    taxiCards: TaxiCardData[];
    flightInfo: FlightInfo[];
}

export const InfoView = ({ hotelInfo, taxiCards, flightInfo }: InfoViewProps) => {
    const [focusedCard, setFocusedCard] = useState<TaxiCardData | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('已複製到剪貼簿！');
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Focus Mode Overlay */}
            {focusedCard && (
                <div
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 animate-in fade-in duration-300"
                    onClick={() => setFocusedCard(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-white/40 hover:text-white p-2"
                        onClick={(e) => { e.stopPropagation(); setFocusedCard(null); }}
                    >
                        <X size={32} />
                    </button>

                    <div className="w-full max-w-4xl space-y-12 text-center">
                        <div className="space-y-4">
                            <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-sm">{focusedCard.label}</span>
                            <div className="h-px w-12 bg-emerald-500/30 mx-auto"></div>
                        </div>

                        <p className="text-5xl md:text-7xl font-bold text-white leading-tight break-words px-4">
                            {focusedCard.jp}
                        </p>

                        <p className="text-xl md:text-2xl text-stone-500 font-serif italic">
                            {focusedCard.cn}
                        </p>

                        <div className="pt-12">
                            <p className="text-stone-600 text-[10px] tracking-widest uppercase animate-pulse">Tap anywhere to close | 點擊任何處關閉</p>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-serif font-semibold border-b border-stone-200 pb-4 mb-8">
                重要資訊 <span className="text-base font-light opacity-50 block mt-1">Travel Info</span>
            </h2>

            {/* 1. Flight Info (Compact Premium Dark Theme) */}
            <section className="max-w-xl">
                <div className="bg-[#1C1816] text-white rounded-[1.5rem] p-6 shadow-lg overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>

                    <div className="flex items-center gap-2 mb-6 relative">
                        <div className="bg-white/5 p-1.5 rounded-lg">
                            <Plane size={16} className="text-emerald-400" />
                        </div>
                        <h3 className="text-base font-bold tracking-tight">航班 <span className="text-stone-500 font-serif italic ml-1 text-xs">Flights</span></h3>
                    </div>

                    <div className="space-y-6 relative">
                        {flightInfo.map((flight, i) => {
                            const labels: Record<string, { cn: string; en: string; color: string }> = {
                                departure: { cn: '去程', en: 'OUT', color: 'text-stone-400' },
                                early_return: { cn: '提前', en: 'EARLY', color: 'text-orange-400' },
                                main_return: { cn: '主要', en: 'MAIN', color: 'text-stone-400' }
                            };
                            const label = labels[flight.type] || labels.departure;

                            return (
                                <div key={i} className="flex flex-col gap-3">
                                    {i > 0 && <div className="h-[1px] w-full bg-white/5"></div>}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="space-y-0.5 min-w-0">
                                            <p className={`text-[8px] font-black tracking-widest uppercase ${label.color}`}>
                                                {label.cn} | {flight.date.split(' ')[0]}
                                            </p>
                                            <div className="flex items-baseline gap-2">
                                                <h4 className="text-2xl font-bold tracking-tighter leading-none">{flight.flightNo}</h4>
                                                <span className="text-[10px] text-stone-500 font-medium truncate">{flight.airline}</span>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <span className="text-lg font-serif font-bold text-white">{flight.depTime}</span>
                                                <span className="text-[9px] font-bold text-stone-500">{flight.depAirport}</span>
                                            </div>
                                            <div className="flex items-center gap-2 justify-end -mt-1">
                                                <span className="text-lg font-serif font-bold text-white/90">{flight.arrTime}</span>
                                                <span className="text-[9px] font-bold text-stone-500">{flight.arrAirport}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 2. Hotel Info (Light & Airy Redesign) */}
            <section>
                <div className="flex items-center gap-2 mb-6 text-stone-400">
                    <Hotel size={16} />
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase">住宿資訊 Accommodation</h3>
                </div>
                <div className="grid gap-6">
                    {hotelInfo.map((hotel, i) => (
                        <div key={i} className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100/60 relative overflow-hidden group">
                            {/* Subtle corner accent */}
                            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/10 transition-all group-hover:bg-emerald-500/20"></div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[9px] font-black text-emerald-600 tracking-widest uppercase bg-emerald-50 px-2 py-0.5 rounded-full mb-2 inline-block leading-tight">
                                        {hotel.city} Stay
                                    </span>
                                    <h4 className="text-xl font-serif font-bold text-stone-900 leading-tight">{hotel.name}</h4>
                                </div>
                                <div className="bg-stone-50 p-3 rounded-2xl group-hover:bg-emerald-50 transition-colors">
                                    <Hotel size={20} className="text-stone-300 group-hover:text-emerald-500" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-stone-50/50 rounded-2xl border border-stone-100/50">
                                    <MapPin size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-stone-600 leading-relaxed mb-3 line-clamp-2 md:line-clamp-none">{hotel.address}</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => copyToClipboard(hotel.address)}
                                                className="text-[10px] font-bold bg-white border border-stone-100 hover:border-emerald-200 hover:text-emerald-700 px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95"
                                            >
                                                複製地址
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`, '_blank')}
                                                className="text-[10px] font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-xl transition-all shadow-sm hover:bg-emerald-700 flex items-center gap-1 active:scale-95"
                                            >
                                                查地圖 <ExternalLink size={8} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 px-4 py-3 bg-stone-50/50 rounded-2xl border border-stone-100/50">
                                    <Phone size={18} className="text-emerald-500 flex-shrink-0" />
                                    <p className="text-sm font-medium text-stone-700">{hotel.phone}</p>
                                </div>

                                {hotel.note && (
                                    <div className="px-4 py-3 border-l-2 border-stone-100 mt-2">
                                        <p className="text-xs text-stone-400 italic leading-relaxed">{hotel.note}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Taxi Cards (Responsive Fix + Focus Mode) */}
            <section>
                <div className="flex items-center gap-2 mb-6 text-stone-400">
                    <Car size={16} />
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase">司機溝通卡 Taxi Cards</h3>
                </div>
                <div className="grid gap-3">
                    {taxiCards.map((card, i) => (
                        <div key={i} className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm hover:border-emerald-200 transition-all group flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-widest leading-none inline-block mb-2">{card.label}</span>
                                <p className="text-lg md:text-xl font-bold text-stone-900 leading-tight mb-1 break-words">
                                    {card.jp}
                                </p>
                                <p className="text-xs text-stone-400 font-serif break-words">
                                    {card.cn}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 flex-shrink-0">
                                <button
                                    onClick={() => setFocusedCard(card)}
                                    className="bg-emerald-600 p-2.5 rounded-xl text-white hover:bg-emerald-700 transition-all active:scale-90 shadow-sm"
                                    title="全螢幕聚焦"
                                >
                                    <Maximize2 size={16} />
                                </button>
                                <button
                                    onClick={() => copyToClipboard(card.jp)}
                                    className="bg-stone-50 p-2.5 rounded-xl text-stone-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all active:scale-90"
                                >
                                    <Copy size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
