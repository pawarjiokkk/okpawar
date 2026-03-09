import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion } from 'motion/react';
import { 
  Blend, 
  Plus, 
  Minus, 
  Info, 
  PieChart as PieChartIcon,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

interface Ingredient {
  id: string;
  name: string;
  kcal: number;
  unit: string;
}

const INGREDIENTS: Record<string, Ingredient[]> = {
  Bases: [
    { id: 'water', name: 'Water', kcal: 0, unit: '250ml' },
    { id: 'milk', name: 'Whole Milk', kcal: 150, unit: '250ml' },
    { id: 'skim_milk', name: 'Skim Milk', kcal: 80, unit: '250ml' },
    { id: 'almond_milk', name: 'Almond Milk', kcal: 30, unit: '250ml' },
    { id: 'oat_milk', name: 'Oat Milk', kcal: 120, unit: '250ml' },
    { id: 'coconut_water', name: 'Coconut Water', kcal: 45, unit: '250ml' },
    { id: 'juice', name: 'Orange Juice', kcal: 110, unit: '250ml' },
  ],
  Fruits: [
    { id: 'banana', name: 'Banana', kcal: 105, unit: 'medium' },
    { id: 'strawberries', name: 'Strawberries', kcal: 50, unit: 'cup' },
    { id: 'blueberries', name: 'Blueberries', kcal: 85, unit: 'cup' },
    { id: 'mango', name: 'Mango', kcal: 100, unit: 'cup' },
    { id: 'pineapple', name: 'Pineapple', kcal: 80, unit: 'cup' },
    { id: 'apple', name: 'Apple', kcal: 95, unit: 'medium' },
  ],
  Vegetables: [
    { id: 'spinach', name: 'Spinach', kcal: 7, unit: 'cup' },
    { id: 'kale', name: 'Kale', kcal: 33, unit: 'cup' },
    { id: 'cucumber', name: 'Cucumber', kcal: 15, unit: 'cup' },
    { id: 'celery', name: 'Celery', kcal: 6, unit: 'stalk' },
  ],
  'Healthy Fats': [
    { id: 'avocado', name: 'Avocado', kcal: 160, unit: 'half' },
    { id: 'chia', name: 'Chia Seeds', kcal: 60, unit: 'tbsp' },
    { id: 'pb', name: 'Peanut Butter', kcal: 95, unit: 'tbsp' },
    { id: 'almond_butter', name: 'Almond Butter', kcal: 95, unit: 'tbsp' },
  ],
  'Add-ins': [
    { id: 'protein', name: 'Protein Powder', kcal: 120, unit: 'scoop' },
    { id: 'yogurt', name: 'Greek Yogurt', kcal: 70, unit: '1/2 cup' },
    { id: 'honey', name: 'Honey', kcal: 60, unit: 'tbsp' },
    { id: 'oats', name: 'Rolled Oats', kcal: 150, unit: '1/2 cup' },
  ]
};

const SmoothieCal = () => {
  const [selectedBase, setSelectedBase] = useState('water');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    Fruits: true,
    Vegetables: true
  });

  const toggleCat = (cat: string) => {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const calculate = () => {
    let totalKcal = 0;
    const base = INGREDIENTS.Bases.find(b => b.id === selectedBase);
    if (base) totalKcal += base.kcal;

    Object.entries(INGREDIENTS).forEach(([category, items]) => {
      if (category === 'Bases') return;
      items.forEach(item => {
        const qty = quantities[item.id] || 0;
        totalKcal += qty * item.kcal;
      });
    });

    setResult(Math.round(totalKcal));
  };

  const getChartData = () => {
    const data: any[] = [];
    const base = INGREDIENTS.Bases.find(b => b.id === selectedBase);
    if (base && base.kcal > 0) data.push({ name: 'Base', value: base.kcal });

    Object.entries(INGREDIENTS).forEach(([category, items]) => {
      if (category === 'Bases') return;
      let catTotal = 0;
      items.forEach(item => {
        catTotal += (quantities[item.id] || 0) * item.kcal;
      });
      if (catTotal > 0) data.push({ name: category, value: catTotal });
    });

    return data;
  };

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <ToolLayout
      title="Smoothie Calories Calculator"
      description="Track every calorie in your custom smoothie. Select your liquid base and add your favorite ingredients for a precise nutritional breakdown."
      howItWorks="We calculate calories by summing the energy density of each ingredient based on standard serving sizes. Our database includes common bases, fruits, vegetables, and superfood add-ins to give you a complete picture of your drink's nutritional profile."
      healthTips={[
        "Use water or unsweetened almond milk as a base to keep calories low.",
        "Add spinach or kale for a massive nutrient boost without affecting the taste.",
        "Include a source of protein (like Greek yogurt or powder) to stay full longer.",
        "Watch out for 'healthy' fats like nut butters; they are calorie-dense!"
      ]}
      faqs={[
        {
          question: "Are smoothies good for weight loss?",
          answer: "Yes, if they are high in fiber and protein. However, fruit-only smoothies can be high in sugar and calories, so balance is key."
        },
        {
          question: "Should I use fresh or frozen fruit?",
          answer: "Both are great! Frozen fruit often makes for a thicker, creamier texture and can be more convenient."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          {/* Base Selection */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">1</span>
              Choose Your Liquid Base
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INGREDIENTS.Bases.map(base => (
                <button
                  key={base.id}
                  onClick={() => setSelectedBase(base.id)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedBase === base.id 
                      ? 'border-brand-600 bg-brand-50' 
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <p className={`font-bold text-sm ${selectedBase === base.id ? 'text-brand-900' : 'text-slate-700'}`}>{base.name}</p>
                  <p className="text-xs text-slate-400">{base.kcal} kcal</p>
                </button>
              ))}
            </div>
          </section>

          {/* Ingredients */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">2</span>
              Add Ingredients
            </h3>
            
            {Object.entries(INGREDIENTS).map(([category, items]) => {
              if (category === 'Bases') return null;
              const isExpanded = expandedCats[category];
              return (
                <div key={category} className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                  <button 
                    onClick={() => toggleCat(category)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-100/50 transition-colors"
                  >
                    <span className="font-bold text-slate-900">{category}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6 space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100">
                          <div>
                            <p className="text-sm font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.kcal} kcal / {item.unit}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQty(item.id, -0.5)}
                              className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-slate-900 text-sm">{quantities[item.id] || 0}</span>
                            <button 
                              onClick={() => updateQty(item.id, 0.5)}
                              className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 hover:bg-brand-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <button
            onClick={calculate}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Blend className="w-6 h-6" />
            Calculate Calories
          </button>
        </div>

        <div className="space-y-8">
          {result !== null ? (
            <>
              <ResultCard
                title="Total Calories"
                value={result}
                unit="kcal"
                interpretation={
                  result > 500 
                    ? "High calorie - Best as a meal replacement." 
                    : result < 200 
                    ? "Low calorie - Perfect light snack." 
                    : "Balanced - Great for a healthy meal."
                }
                onReset={() => {
                  setResult(null);
                  setQuantities({});
                }}
                color="emerald"
              />

              {/* Distribution Chart */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <PieChartIcon className="w-5 h-5 text-emerald-500" />
                  <h4 className="font-bold text-slate-900">Calorie Distribution</h4>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                <Blend className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Build Your Smoothie</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Select your ingredients on the left to see the total caloric breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default SmoothieCal;
