import { useState, useRef, useEffect } from 'react';
import { ItineraryDay, ActivityType } from '../types';
import { MapPin, ChevronDown, Plane, Train, Utensils, ShoppingBag, Camera, Hotel, Info, Footprints, BookOpen } from 'lucide-react';

interface ItineraryViewProps {
    data: ItineraryDay[];
}

const ActivityIcon = ({ type, size = 16 }: { type: ActivityType; size?: number }) => {
    const colorMap: Record<ActivityType, string> = {
        plane: 'text-blue-500',
        transport: 'text-indigo-500',
        food: 'text-orange-500',
        shopping: 'text-pink-500',
        sightseeing: 'text-amber-500',
        hotel: 'text-purple-500',
        info: 'text-sky-500',
        walk: 'text-emerald-500',
        free: 'text-stone-400',
    };

    const Icon = () => {
        switch (type) {
            case 'plane': return <Plane size={size} />;
            case 'transport': return <Train size={size} />;
            case 'food': return <Utensils size={size} />;
            case 'shopping': return <ShoppingBag size={size} />;
            case 'sightseeing': return <Camera size={size} />;
            case 'hotel': return <Hotel size={size} />;
            case 'info': return <Info size={size} />;
            case 'walk': return <Footprints size={size} />;
            case 'free': return <MapPin size={size} />;
            default: return null;
        }
    };

    return <span className={colorMap[type] || 'text-stone-400'}><Icon /></span>;
};

export const ItineraryView = ({ data }: ItineraryViewProps) => {
    const [expandedDay, setExpandedDay] = useState<number | null>(1);
    const [selectedPlan, setSelectedPlan] = useState<Record<number, string>>({});
    const dayRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useEffect(() => {
        if (expandedDay !== null && dayRefs.current[expandedDay]) {
            // Small delay to ensure the content has expanded and measurements are correct
            setTimeout(() => {
                dayRefs.current[expandedDay]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 100);
        }
    }, [expandedDay]);

    return (
        <div className="space-y-10 pb-12">
            {/* Main Header */}
            <div className="relative pl-6 py-2 border-l-4 border-emerald-850">
                <h2 className="text-2xl font-serif font-bold text-stone-900 leading-tight">
                    行程一覽 <span className="text-stone-400 font-light block md:inline md:ml-2 text-lg">Itinerary</span>
                </h2>
                <p className="text-xs font-bold tracking-[0.2em] text-stone-400 mt-1 uppercase">每日行程 DAILY SCHEDULE</p>
            </div>

            <div className="space-y-6">
                {data.map((day) => {
                    const isExpanded = expandedDay === day.day;
                    const currentPlanId = selectedPlan[day.day] || (day.options ? day.options[0].id : null);
                    const currentPlan = day.options ? day.options.find(o => o.id === currentPlanId) : null;

                    const schedule = currentPlan ? currentPlan.schedule : day.schedule;
                    const highlights = currentPlan ? currentPlan.highlights : day.highlights;
                    const guide = currentPlan ? currentPlan.spotGuide : day.spotGuide;
                    const title = currentPlan ? currentPlan.title : day.title;

                    return (
                        <div
                            key={day.day}
                            ref={el => dayRefs.current[day.day] = el}
                            style={{ scrollMarginTop: '100px' }}
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 transition-all duration-500"
                        >
                            {/* Day Header */}
                            <button
                                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                                className={`w-full text-left p-6 md:p-8 flex items-start gap-6 transition-colors ${isExpanded ? 'bg-white' : 'hover:bg-stone-50/50'}`}
                            >
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-black tracking-widest text-stone-300 uppercase block mb-1">Day {day.day}</span>
                                    <p className="text-2xl font-serif font-bold text-stone-900 mb-2">{day.date}</p>
                                    <h3 className="text-lg font-medium text-stone-500 mb-4">{title}</h3>
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {highlights.map((h, i) => (
                                            <span key={i} className="px-3 py-1 bg-stone-50 text-[10px] font-bold rounded-full text-stone-400 border border-stone-100/50">
                                                #{h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`mt-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={20} className="text-stone-300" />
                                </div>
                            </button>

                            {/* Day Content */}
                            {isExpanded && (
                                <div className="px-6 md:px-8 pb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                                    {/* Option Tabs */}
                                    {day.options && (
                                        <div className="flex gap-2 p-1.5 bg-stone-50 rounded-2xl mb-8 max-w-sm border border-stone-100">
                                            {day.options.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedPlan({ ...selectedPlan, [day.day]: opt.id });
                                                    }}
                                                    className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentPlanId === opt.id ? 'bg-white text-emerald-800 shadow-sm border border-stone-100' : 'text-stone-400 hover:text-stone-600'}`}
                                                >
                                                    {opt.label}
                                                    <span className="block text-[8px] font-normal opacity-60 mt-0.5">{opt.subLabel}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Travel Guide Section */}
                                    {guide && (
                                        <div className="mb-10 relative bg-emerald-50/30 rounded-3xl p-6 md:p-8 border border-emerald-100/30 overflow-hidden">
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-2 mb-4 text-emerald-800/80">
                                                    <BookOpen size={18} />
                                                    <h4 className="text-sm font-black tracking-widest uppercase">景點導覽 TRAVEL GUIDE</h4>
                                                </div>
                                                <p className="text-sm md:text-base text-stone-700 whitespace-pre-wrap leading-relaxed">
                                                    {guide}
                                                </p>
                                            </div>
                                            <BookOpen className="absolute -right-6 -bottom-6 w-32 h-32 text-emerald-900/5 rotate-12 pointer-events-none" />
                                        </div>
                                    )}

                                    {/* Timeline Schedule */}
                                    <div className="space-y-0 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-50">
                                        {schedule.map((item, idx) => (
                                            <div key={idx} className="relative pl-10 pb-8 last:pb-0">
                                                {/* Timeline dot */}
                                                <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-stone-200 border-2 border-white shadow-sm z-10"></div>

                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[11px] font-black text-stone-300 tracking-widest">{item.time}</span>
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <h4 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                                                            <ActivityIcon type={item.type} size={18} />
                                                            {item.activity}
                                                        </h4>
                                                    </div>
                                                    {item.note && <p className="text-sm text-stone-500 font-medium">{item.note}</p>}

                                                    <div
                                                        className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-emerald-50/50 rounded-full text-emerald-700/80 hover:bg-emerald-100 transition-colors cursor-pointer w-fit"
                                                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`, '_blank')}
                                                    >
                                                        <MapPin size={12} />
                                                        <span className="text-[10px] font-bold">{item.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
