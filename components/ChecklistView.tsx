import { useState, useEffect } from 'react';
import { ChecklistItemData } from '../types';
import { Check, Trash2, Plus, ClipboardCheck } from 'lucide-react';

interface ChecklistViewProps {
    initialData: ChecklistItemData[];
}

export const ChecklistView = ({ initialData }: ChecklistViewProps) => {
    const [items, setItems] = useState<ChecklistItemData[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [newItemText, setNewItemText] = useState('');
    const [activeAddCategory, setActiveAddCategory] = useState<'document' | 'gadget' | 'clothing' | 'money'>('gadget');

    const progress = items.length > 0 ? Math.round((checkedIds.length / items.length) * 100) : 0;

    useEffect(() => {
        const savedChecked = localStorage.getItem('trip_checklist_checked');
        const savedCustom = localStorage.getItem('trip_checklist_custom');

        if (savedChecked) setCheckedIds(JSON.parse(savedChecked));

        const customItems = savedCustom ? JSON.parse(savedCustom) : [];
        setItems([...initialData, ...customItems]);
    }, [initialData]);

    useEffect(() => {
        localStorage.setItem('trip_checklist_checked', JSON.stringify(checkedIds));
    }, [checkedIds]);

    const toggleCheck = (id: number) => {
        setCheckedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const addItem = () => {
        if (!newItemText.trim()) return;
        const newItem: ChecklistItemData = {
            id: Date.now(),
            item: newItemText,
            category: activeAddCategory,
        };
        const newItems = [...items, newItem];
        setItems(newItems);

        const customItems = JSON.parse(localStorage.getItem('trip_checklist_custom') || '[]');
        localStorage.setItem('trip_checklist_custom', JSON.stringify([...customItems, newItem]));
        setNewItemText('');
    };

    const removeItem = (id: number) => {
        if (initialData.find(i => i.id === id)) return; // Don't delete initial data
        const newItems = items.filter(i => i.id !== id);
        setItems(newItems);

        const customItems = JSON.parse(localStorage.getItem('trip_checklist_custom') || '[]');
        localStorage.setItem('trip_checklist_custom', JSON.stringify(customItems.filter((i: any) => i.id !== id)));
    };

    const moveItem = (id: number, newCat: 'document' | 'gadget' | 'clothing' | 'money') => {
        const updatedItems = items.map(item => item.id === id ? { ...item, category: newCat } : item);
        setItems(updatedItems);

        // Also update custom items in localStorage
        const customItems = JSON.parse(localStorage.getItem('trip_checklist_custom') || '[]');
        const updatedCustom = customItems.map((item: any) => item.id === id ? { ...item, category: newCat } : item);
        localStorage.setItem('trip_checklist_custom', JSON.stringify(updatedCustom));
    };

    const categories = ['document', 'gadget', 'clothing', 'money'] as const;

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="relative pl-6 py-2 border-l-4 border-emerald-850">
                <h2 className="text-4xl font-serif font-bold text-stone-900 leading-tight">
                    行前清單 <span className="text-stone-400 font-light block md:inline md:ml-2">Checklist</span>
                </h2>
                <p className="text-xs font-bold tracking-[0.2em] text-stone-400 mt-1 uppercase">必備物品 DON'T FORGET THESE</p>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 transition-all duration-500">
                <div className="flex justify-between items-end mb-6">
                    <div className="flex items-center gap-4 text-stone-700">
                        <div className="bg-emerald-50 p-3 rounded-2xl">
                            <ClipboardCheck size={28} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900">
                                準備進度 <span className="text-emerald-800/40 font-serif italic ml-1 invisible md:visible">Progress</span>
                            </h3>
                            <p className="text-xs text-stone-400 font-medium">已完成 {checkedIds.length} / 共 {items.length} 項</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-5xl font-serif font-bold text-emerald-850 leading-none">{progress}<span className="text-2xl ml-0.5">%</span></span>
                    </div>
                </div>
                <div className="h-3 w-full bg-stone-50 rounded-full overflow-hidden border border-stone-100/50 p-0.5">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Add Item Section */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">選擇分類 Category</span>
                    <div className="h-[1px] flex-1 bg-stone-100"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveAddCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${activeAddCategory === cat ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 text-stone-400 hover:border-stone-400'}`}
                        >
                            {cat === 'document' && '文件'}
                            {cat === 'gadget' && '器材'}
                            {cat === 'clothing' && '服飾'}
                            {cat === 'money' && '金資'}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3 mt-2">
                    <input
                        type="text"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="新增您在這個分類的清單..."
                        className="flex-1 bg-stone-50/50 border border-stone-100 rounded-2xl px-6 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && addItem()}
                    />
                    <button
                        onClick={addItem}
                        className="bg-stone-900 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-12 mt-10">
                {categories.map(cat => {
                    const catItems = items.filter(i => i.category === cat);
                    if (catItems.length === 0) return null;

                    return (
                        <div key={cat} className="space-y-6">
                            <div className="flex items-center gap-4 translate-x-[-8px]">
                                <div className="h-[2px] w-8 bg-emerald-400/20"></div>
                                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-stone-400">
                                    {cat === 'document' && '文件 Documents'}
                                    {cat === 'gadget' && '器材 Gadgets'}
                                    {cat === 'clothing' && '服飾 & 藥品 Clothing'}
                                    {cat === 'money' && '金資 Money'}
                                </h3>
                            </div>
                            <div className="grid gap-3">
                                {catItems.map(item => {
                                    const isChecked = checkedIds.includes(item.id);
                                    const isCustom = !initialData.find(i => i.id === item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group ${isChecked ? 'bg-stone-50/50 border-transparent opacity-60' : 'bg-white border-stone-100 shadow-sm hover:border-emerald-200'}`}
                                        >
                                            <button
                                                onClick={() => toggleCheck(item.id)}
                                                className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]' : 'bg-white border-stone-200 text-transparent hover:border-emerald-300'}`}
                                            >
                                                <Check size={16} strokeWidth={4} />
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <span className={`text-base block truncate transition-all ${isChecked ? 'text-stone-400 line-through' : 'text-stone-800 font-medium'}`}>
                                                    {item.item}
                                                </span>
                                                {item.important && !isChecked && (
                                                    <span className="inline-block mt-1 text-[9px] font-black tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase border border-emerald-100">必備</span>
                                                )}
                                            </div>
                                            {isCustom && (
                                                <div className="flex items-center gap-1">
                                                    <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
                                                        {categories.map(catOpt => (
                                                            catOpt !== item.category && (
                                                                <button
                                                                    key={catOpt}
                                                                    onClick={() => moveItem(item.id, catOpt)}
                                                                    className="px-2 py-1 bg-stone-100 text-[10px] font-bold rounded-lg text-stone-400 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-1"
                                                                >
                                                                    {catOpt === 'document' && <ClipboardCheck size={10} />}
                                                                    {catOpt === 'gadget' && <Plus size={10} />}
                                                                    {catOpt === 'clothing' && <Check size={10} />}
                                                                    {catOpt === 'money' && <Check size={10} />}
                                                                    <span className="whitespace-nowrap">
                                                                        {catOpt === 'document' && '移至文件'}
                                                                        {catOpt === 'gadget' && '移至器材'}
                                                                        {catOpt === 'clothing' && '移至服飾'}
                                                                        {catOpt === 'money' && '移至金資'}
                                                                    </span>
                                                                </button>
                                                            )
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 text-stone-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
