import { useState, useEffect } from 'react';
import { ShoppingItem, PersonalShoppingItem } from '../types';
import { ShoppingBag, Plus, Trash2, Check, Sparkles, User } from 'lucide-react';

interface ShoppingViewProps {
    recommendations: ShoppingItem[];
}

export const ShoppingView = ({ recommendations }: ShoppingViewProps) => {
    const [personalItems, setPersonalItems] = useState<PersonalShoppingItem[]>([]);
    const [checkedRecommendations, setCheckedRecommendations] = useState<string[]>([]);
    const [newItemText, setNewItemText] = useState('');
    const [newItemArea, setNewItemArea] = useState('');

    useEffect(() => {
        const savedPersonal = localStorage.getItem('trip_shopping_personal');
        const savedCheckedRecs = localStorage.getItem('trip_shopping_checked_recs');

        if (savedPersonal) setPersonalItems(JSON.parse(savedPersonal));
        if (savedCheckedRecs) setCheckedRecommendations(JSON.parse(savedCheckedRecs));
    }, []);

    useEffect(() => {
        localStorage.setItem('trip_shopping_personal', JSON.stringify(personalItems));
    }, [personalItems]);

    useEffect(() => {
        localStorage.setItem('trip_shopping_checked_recs', JSON.stringify(checkedRecommendations));
    }, [checkedRecommendations]);

    const toggleRecommendation = (day: string, area: string, item: string) => {
        const key = `${day}-${area}-${item}`;
        setCheckedRecommendations(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const addPersonalItem = () => {
        if (!newItemText.trim()) return;
        const newItem: PersonalShoppingItem = {
            id: Date.now(),
            item: newItemText,
            area: newItemArea || '未分類',
            checked: false,
        };
        setPersonalItems(prev => [newItem, ...prev]);
        setNewItemText('');
        setNewItemArea('');
    };

    const togglePersonalItem = (id: number) => {
        setPersonalItems(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const removePersonalItem = (id: number) => {
        setPersonalItems(prev => prev.filter(item => item.id !== id));
    };

    const itineraryRecs = recommendations.filter(r => r.day.startsWith('Day'));
    const generalRecs = recommendations.filter(r => r.day === 'General');

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="relative pl-6 py-2 border-l-4 border-emerald-850">
                <h2 className="text-4xl font-serif font-bold text-stone-900 leading-tight">
                    必買清單 <span className="text-stone-400 font-light block md:inline md:ml-2">Shopping</span>
                </h2>
                <p className="text-xs font-bold tracking-[0.2em] text-stone-400 mt-1 uppercase">區域必逛與每日行程 REGIONAL & ITINERARY</p>
            </div>

            {/* Section 1: Regional Recommendations (Kyoto & Osaka General) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-700">
                    <div className="bg-emerald-50 p-2 rounded-lg">
                        <Sparkles size={18} />
                    </div>
                    <h3 className="text-lg font-bold">京阪地標收藏 <span className="text-stone-400 font-serif italic ml-1 text-sm">Regional Collection</span></h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {generalRecs.map((group, i) => (
                        <div key={i} className="bg-emerald-50/30 border border-emerald-100 rounded-[1.5rem] p-6 shadow-sm flex flex-col h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl -mr-12 -mt-12"></div>
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-emerald-100/50 relative">
                                <span className="text-[10px] font-black text-emerald-600/60 tracking-[0.2em] uppercase">REGIONAL PICK</span>
                                <span className="text-[11px] font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-100 shadow-sm">{group.area}</span>
                            </div>
                            <ul className="space-y-3 flex-1 relative">
                                {group.items.map((item, j) => {
                                    const isChecked = checkedRecommendations.includes(`${group.day}-${group.area}-${item}`);
                                    return (
                                        <li
                                            key={j}
                                            onClick={() => toggleRecommendation(group.day, group.area, item)}
                                            className="flex items-start gap-4 cursor-pointer group/item"
                                        >
                                            <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-emerald-200 group-hover/item:border-emerald-400'}`}>
                                                {isChecked && <Check size={12} strokeWidth={4} />}
                                            </div>
                                            <span className={`text-[15px] transition-all ${isChecked ? 'text-stone-300 line-through' : 'text-emerald-950 font-semibold'}`}>
                                                {item}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 2: Itinerary Recommendations */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-stone-500">
                    <div className="bg-stone-50 p-2 rounded-lg">
                        <ShoppingBag size={18} />
                    </div>
                    <h3 className="text-lg font-bold">每日行程推薦 <span className="text-stone-400 font-serif italic ml-1 text-sm">Itinerary Based</span></h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {itineraryRecs.map((group, i) => (
                        <div key={i} className="bg-white border border-stone-100 rounded-[1.5rem] p-6 shadow-sm flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-50">
                                <span className="text-[9px] font-black text-stone-300 tracking-[0.2em] uppercase">{group.day}</span>
                                <span className="text-[10px] font-bold text-stone-500 bg-stone-50 px-2 py-0.5 rounded-lg border border-stone-100">{group.area}</span>
                            </div>
                            <ul className="space-y-2.5 flex-1">
                                {group.items.map((item, j) => {
                                    const isChecked = checkedRecommendations.includes(`${group.day}-${group.area}-${item}`);
                                    return (
                                        <li
                                            key={j}
                                            onClick={() => toggleRecommendation(group.day, group.area, item)}
                                            className="flex items-start gap-3 cursor-pointer group/item shadow-sm hover:shadow-md transition-shadow p-2 rounded-xl border border-transparent hover:border-stone-50"
                                        >
                                            <div className={`mt-1 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${isChecked ? 'bg-stone-300 border-stone-300 text-white' : 'bg-white border-stone-200 group-hover/item:border-emerald-300'}`}>
                                                {isChecked && <Check size={10} strokeWidth={4} />}
                                            </div>
                                            <span className={`text-sm transition-all ${isChecked ? 'text-stone-300 line-through font-normal' : 'text-stone-600 font-medium'}`}>
                                                {item}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className="h-px w-full bg-stone-100"></div>

            {/* Section 2: Personal List */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-stone-700">
                    <div className="bg-stone-100 p-2 rounded-lg">
                        <User size={18} />
                    </div>
                    <h3 className="text-lg font-bold">私藏清單 <span className="text-stone-400 font-serif italic ml-1 text-sm">My List</span></h3>
                </div>

                {/* Input Card */}
                <div className="bg-white border border-stone-100 rounded-[1.5rem] p-6 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder="想買什麼？"
                            className="flex-1 bg-stone-50/50 border border-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && addPersonalItem()}
                        />
                        <input
                            type="text"
                            value={newItemArea}
                            onChange={(e) => setNewItemArea(e.target.value)}
                            placeholder="地點 (選填)"
                            className="md:w-32 bg-stone-50/50 border border-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && addPersonalItem()}
                        />
                        <button
                            onClick={addPersonalItem}
                            className="bg-stone-900 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 font-bold text-sm active:scale-95"
                        >
                            <Plus size={18} /> 新增項目
                        </button>
                    </div>
                </div>

                {/* Personal Items Grid */}
                {personalItems.length > 0 ? (
                    <div className="grid gap-3">
                        {personalItems.map(item => (
                            <div
                                key={item.id}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.checked ? 'bg-stone-50/50 border-transparent opacity-60' : 'bg-white border-stone-100 shadow-sm hover:border-emerald-200'}`}
                            >
                                <button
                                    onClick={() => togglePersonalItem(item.id)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-stone-200 text-transparent hover:border-emerald-300'}`}
                                >
                                    <Check size={14} strokeWidth={4} />
                                </button>
                                <div className="flex-1 min-w-0">
                                    <span className={`text-base block truncate ${item.checked ? 'text-stone-400 line-through' : 'text-stone-800 font-medium'}`}>
                                        {item.item}
                                    </span>
                                    {item.area && (
                                        <span className="text-[10px] text-stone-400 font-medium tracking-wider uppercase">{item.area}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => removePersonalItem(item.id)}
                                    className="p-2 text-stone-200 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center border-2 border-dashed border-stone-100 rounded-[2rem]">
                        <p className="text-stone-300 text-sm italic">還沒有加入任何私藏清單哦</p>
                    </div>
                )}
            </section>
        </div>
    );
};
