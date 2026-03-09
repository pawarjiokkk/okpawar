import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Target, 
  Droplets, 
  Sparkles, 
  Zap, 
  Leaf, 
  Info, 
  Activity,
  Trash2,
  Printer,
  ChevronRight,
  Clock
} from 'lucide-react';

const DETOX_GOALS = [
  { id: 'weight-loss', name: 'Weight Loss', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50', description: 'Focus on metabolism-boosting ingredients.' },
  { id: 'skin', name: 'Clear Skin', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-50', description: 'Antioxidant-rich blends for a healthy glow.' },
  { id: 'energy', name: 'Energy Boost', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', description: 'Natural stimulants and vitamin-packed bases.' },
  { id: 'digestion', name: 'Digestive Health', icon: Leaf, color: 'text-green-500', bg: 'bg-green-50', description: 'Soothing ingredients to support gut health.' },
];

const BASES = [
  { id: 'green-tea', name: 'Green Tea', calories: 2, benefits: 'High in catechins' },
  { id: 'lemon-water', name: 'Lemon Water', calories: 5, benefits: 'Alkalizing & Vitamin C' },
  { id: 'acv', name: 'Apple Cider Vinegar', calories: 3, benefits: 'Blood sugar support' },
  { id: 'herbal', name: 'Herbal Infusion', calories: 0, benefits: 'Calming & Hydrating' },
];

const RECIPES: Record<string, string[]> = {
  'weight-loss': ['Cayenne Pepper', 'Ginger', 'Cinnamon', 'Grapefruit'],
  'skin': ['Cucumber', 'Mint', 'Blueberries', 'Aloe Vera'],
  'energy': ['Matcha', 'Honey', 'Ginseng', 'Orange Slices'],
  'digestion': ['Fennel', 'Peppermint', 'Chia Seeds', 'Turmeric'],
};

const DetoxPlanner = () => {
  const [goal, setGoal] = useState(DETOX_GOALS[0].id);
  const [base, setBase] = useState(BASES[0].id);
  const [duration, setDuration] = useState(3);
  const [showPlan, setShowPlan] = useState(false);

  const generatePlan = () => {
    setShowPlan(true);
  };

  const selectedGoal = DETOX_GOALS.find(g => g.id === goal)!;
  const selectedBase = BASES.find(b => b.id === base)!;

  return (
    <ToolLayout
      title="Detox Drink Planner"
      description="Create a personalized hydration schedule to support your body's natural wellness goals. Select your focus and generate a custom plan."
      howItWorks="Our planner combines specific liquid bases with targeted botanical ingredients known for their metabolic or antioxidant properties. We structure your day into three key hydration windows: Morning Reset, Mid-Day Hydration, and Evening Soothe, ensuring consistent support for your detoxification pathways."
      healthTips={[
        "Detox drinks are most effective when paired with a clean, whole-food diet.",
        "Stay consistent with your schedule for the best results.",
        "Listen to your body; if you feel lightheaded, increase your caloric intake.",
        "Drink plenty of plain water alongside your detox beverages."
      ]}
      faqs={[
        {
          question: "Can I eat while on this plan?",
          answer: "Yes! This is a hydration-focused plan meant to supplement your meals, not replace them."
        },
        {
          question: "What is the best time to start?",
          answer: "Most people find starting on a Monday or after a weekend of indulgence works best for a mental and physical reset."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          {/* Goal Selection */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">1</span>
              Your Primary Goal
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {DETOX_GOALS.map((g) => {
                const Icon = g.icon;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 ${
                      goal === g.id 
                        ? 'border-brand-600 bg-brand-50' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${goal === g.id ? g.color + ' ' + g.bg : 'bg-white text-slate-400'}`}>
                      {React.createElement(g.icon, { className: "w-5 h-5" })}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${goal === g.id ? 'text-brand-900' : 'text-slate-700'}`}>{g.name}</p>
                      <p className="text-[10px] text-slate-400 leading-tight">{g.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Base Selection */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">2</span>
              Preferred Base
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BASES.map(b => (
                <button
                  key={b.id}
                  onClick={() => setBase(b.id)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    base === b.id 
                      ? 'border-brand-600 bg-brand-50' 
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <p className={`font-bold text-sm ${base === b.id ? 'text-brand-900' : 'text-slate-700'}`}>{b.name}</p>
                  <p className="text-[10px] text-slate-400">{b.benefits}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Duration */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">3</span>
              Duration (Days)
            </h3>
            <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <input 
                type="range" 
                min="1" 
                max="7" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="flex-grow accent-brand-600"
              />
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shadow-sm">
                <span className="text-xl font-black text-brand-600">{duration}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">Days</span>
              </div>
            </div>
          </section>

          <button
            onClick={generatePlan}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Calendar className="w-6 h-6" />
            Generate My Plan
          </button>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {showPlan ? (
              <motion.div 
                key="plan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-brand-600 p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-brand-100 uppercase tracking-widest text-xs font-bold mb-2">Personalized Plan</p>
                      <h2 className="text-4xl font-black mb-1">{duration}-Day {selectedGoal.name}</h2>
                      <p className="text-brand-100 text-sm">Base: {selectedBase.name}</p>
                    </div>
                    {React.createElement(selectedGoal.icon, { className: "absolute -right-8 -bottom-8 w-48 h-48 text-white/10 rotate-12" })}
                  </div>

                  <div className="p-10 space-y-10">
                    {/* Ingredients */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Daily Core Ingredients</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {RECIPES[goal].map((ing, i) => (
                          <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                            <span className="text-sm font-bold text-slate-700">{ing}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Daily Hydration Schedule</h4>
                      <div className="space-y-6">
                        {[
                          { time: '8:00 AM', title: 'Morning Reset', desc: `Drink 250ml of your ${selectedGoal.name.toLowerCase()} blend on an empty stomach.` },
                          { time: '1:00 PM', title: 'Mid-Day Hydration', desc: `Sip on pure ${selectedBase.name} with fresh mint to maintain energy levels.` },
                          { time: '8:00 PM', title: 'Evening Soothe', desc: `Warm ${selectedBase.name} infusion to support overnight detoxification.` }
                        ].map((step, i) => (
                          <div key={i} className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-black border border-brand-100">
                                {i + 1}
                              </div>
                              {i < 2 && <div className="w-px flex-grow bg-slate-100 my-2"></div>}
                            </div>
                            <div className="pb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{step.time}</span>
                              </div>
                              <p className="font-bold text-slate-900 mb-1">{step.title}</p>
                              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                      <button 
                        onClick={() => window.print()}
                        className="flex items-center gap-2 text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        Print Schedule
                      </button>
                      <button 
                        onClick={() => setShowPlan(false)}
                        className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Calendar className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Reset?</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Configure your detox goals on the left to generate your personalized liquid nutrition schedule.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DetoxPlanner;
