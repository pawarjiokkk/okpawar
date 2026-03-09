import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Citrus, 
  Leaf, 
  Zap, 
  Info, 
  Activity,
  Trash2,
  Heart,
  Plus,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const BOOSTERS = [
  {
    id: 'citrus-blast',
    name: 'Citrus Vitamin C Blast',
    focus: 'Cold Prevention',
    ingredients: ['Orange', 'Lemon', 'Grapefruit', 'Honey'],
    benefits: 'High concentration of Vitamin C to support white blood cell production.',
    icon: Citrus,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    id: 'golden-milk',
    name: 'Turmeric Golden Milk',
    focus: 'Anti-Inflammatory',
    ingredients: ['Turmeric', 'Black Pepper', 'Ginger', 'Coconut Milk'],
    benefits: 'Curcumin provides powerful anti-inflammatory and antioxidant effects.',
    icon: Sparkles,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    id: 'green-defense',
    name: 'Green Defense Juice',
    focus: 'Gut Health',
    ingredients: ['Spinach', 'Green Apple', 'Cucumber', 'Probiotic Yogurt'],
    benefits: 'Supports the 70% of your immune system located in your gut.',
    icon: Leaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'berry-shield',
    name: 'Elderberry & Zinc Tea',
    focus: 'Viral Defense',
    ingredients: ['Elderberry Syrup', 'Zinc-rich seeds', 'Hot Water'],
    benefits: 'Elderberries are known to reduce the duration of cold and flu symptoms.',
    icon: Shield,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  }
];

const ImmunityBoostTool = () => {
  const [focus, setFocus] = useState('Cold Prevention');
  const [result, setResult] = useState<typeof BOOSTERS[0] | null>(null);

  const getBooster = () => {
    const found = BOOSTERS.find(b => b.focus === focus);
    setResult(found || BOOSTERS[0]);
  };

  return (
    <ToolLayout
      title="Immunity Boost Drink Tool"
      description="Strengthen your body's natural defenses with vitamin-rich drink recommendations tailored to your current health focus."
      howItWorks="Our immunity tool matches common health concerns with specific micronutrients and botanical compounds. Whether you're looking for Vitamin C for cold prevention or Curcumin for inflammation, we provide a targeted recipe designed to provide the building blocks your immune system needs to function at its peak."
      healthTips={[
        "70% of your immune system is located in your gut; prioritize probiotic-rich drinks.",
        "Vitamin C is heat-sensitive; avoid using boiling water for citrus-based teas.",
        "Stay hydrated; water helps your body produce lymph, which carries white blood cells.",
        "Combine turmeric with black pepper to increase curcumin absorption by up to 2,000%."
      ]}
      faqs={[
        {
          question: "Can drinks really prevent illness?",
          answer: "While no drink is a magic shield, consistent intake of antioxidants and vitamins supports your immune response and can reduce symptom duration."
        },
        {
          question: "When should I drink these?",
          answer: "Daily for maintenance, or twice daily if you feel a scratchy throat or general fatigue coming on."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          {/* Focus Selection */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">1</span>
              Select Health Focus
            </h3>
            <div className="space-y-3">
              {BOOSTERS.map((b) => {
                const Icon = b.icon;
                return (
                  <button
                    key={b.id}
                    onClick={() => setFocus(b.focus)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                      focus === b.focus 
                        ? 'border-brand-600 bg-brand-50' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${focus === b.focus ? b.color + ' ' + b.bg : 'bg-white text-slate-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${focus === b.focus ? 'text-brand-900' : 'text-slate-700'}`}>{b.focus}</p>
                      <p className="text-[10px] text-slate-400">{b.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <button
            onClick={getBooster}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Shield className="w-6 h-6" />
            Reveal Booster Recipe
          </button>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className={`p-10 text-white relative overflow-hidden ${result.id === 'citrus-blast' ? 'bg-orange-500' : result.id === 'golden-milk' ? 'bg-amber-500' : result.id === 'green-defense' ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                    <div className="relative z-10">
                      <p className="text-white/70 uppercase tracking-widest text-xs font-bold mb-2">Recommended Booster</p>
                      <h2 className="text-4xl font-black mb-1">{result.name}</h2>
                      <div className="flex items-center gap-2 text-white/80 text-sm mt-4">
                        <Heart className="w-4 h-4" />
                        <span className="font-bold">Focus: {result.focus}</span>
                      </div>
                    </div>
                    {React.createElement(result.icon, { className: "absolute -right-8 -bottom-8 w-48 h-48 text-white/10 rotate-12" })}
                  </div>

                  <div className="p-10 space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Primary Benefits</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed">{result.benefits}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Key Ingredients</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {result.ingredients.map((ing, i) => (
                          <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <Plus className="w-3 h-3 text-brand-500" />
                            <span className="text-sm font-bold text-slate-700">{ing}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                      <button 
                        onClick={() => setResult(null)}
                        className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                      >
                        Try Another Focus
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Strengthen Your Defense</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Select your health focus on the left to see your personalized immunity-boosting drink recommendation.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImmunityBoostTool;
