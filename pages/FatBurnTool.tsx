import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Coffee, 
  Leaf, 
  CupSoda, 
  Zap, 
  Info, 
  Activity,
  Trash2,
  Clock,
  Thermometer,
  ChevronRight
} from 'lucide-react';

const RECOMMENDATIONS = [
  {
    id: 'green-tea',
    name: 'Matcha Green Tea',
    benefits: 'High in EGCG which boosts metabolism and fat oxidation.',
    recipe: '1 tsp Matcha powder, 8oz hot water (not boiling), squeeze of lemon.',
    intensity: 'High',
    caffeine: 'Medium',
    icon: Leaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'oolong',
    name: 'Oolong Tea',
    benefits: 'Promotes weight loss by improving lipid metabolism.',
    intensity: 'Medium',
    caffeine: 'Medium',
    recipe: 'Steep Oolong leaves for 3 minutes. Best consumed 30 mins before a workout.',
    icon: CupSoda,
    color: 'text-brand-500',
    bg: 'bg-brand-50'
  },
  {
    id: 'coffee',
    name: 'Black Coffee',
    benefits: 'Caffeine increases metabolic rate by 3-11%.',
    intensity: 'Very High',
    caffeine: 'High',
    recipe: 'Freshly brewed black coffee. Avoid sugar and cream for maximum fat burn.',
    icon: Coffee,
    color: 'text-amber-700',
    bg: 'bg-amber-50'
  },
  {
    id: 'ginger-lemon',
    name: 'Ginger Lemon Water',
    benefits: 'Thermogenic properties that help suppress appetite.',
    intensity: 'Low',
    caffeine: 'None',
    recipe: 'Grated ginger, half a lemon, 12oz warm water. Drink first thing in the morning.',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50'
  }
];

const FatBurnTool = () => {
  const [caffeinePref, setCaffeinePref] = useState('any');
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [suggestion, setSuggestion] = useState<typeof RECOMMENDATIONS[0] | null>(null);

  const getSuggestion = () => {
    let filtered = RECOMMENDATIONS;
    if (caffeinePref === 'none') {
      filtered = filtered.filter(r => r.caffeine === 'None');
    } else if (caffeinePref === 'high') {
      filtered = filtered.filter(r => r.caffeine === 'High' || r.caffeine === 'Medium');
    }

    if (timeOfDay === 'evening') {
      const lowCaff = filtered.find(r => r.caffeine === 'None');
      setSuggestion(lowCaff || filtered[0]);
    } else {
      setSuggestion(filtered[Math.floor(Math.random() * filtered.length)]);
    }
  };

  return (
    <ToolLayout
      title="Fat Burn Drink Suggestion"
      description="Discover natural beverages that can help boost your metabolism and support your fat loss goals based on your preferences."
      howItWorks="Our recommendation engine analyzes your caffeine tolerance and the time of day to suggest the most effective thermogenic beverage. We prioritize drinks with high catechin or caffeine content for morning/afternoon boosts, while suggesting non-stimulant, appetite-suppressing options for evening consumption."
      healthTips={[
        "Caffeine and catechins can slightly increase metabolic rate and fat oxidation.",
        "Avoid added sugars and creams to maximize the fat-burning potential.",
        "Drink these beverages 30 minutes before physical activity for a performance boost.",
        "Consistency is key; incorporate these into your daily routine for long-term benefits."
      ]}
      faqs={[
        {
          question: "Do fat burn drinks really work?",
          answer: "While no drink can replace a healthy diet and exercise, certain ingredients can slightly increase metabolic rate and fat oxidation."
        },
        {
          question: "Can I drink these on an empty stomach?",
          answer: "Most are safe, but black coffee or strong green tea can cause acidity for some. Listen to your body and have a small snack if needed."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          {/* Preferences */}
          <section className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">1</span>
                Caffeine Tolerance
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {['none', 'any', 'high'].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => setCaffeinePref(pref)}
                    className={`py-4 px-4 rounded-2xl border-2 text-sm font-bold capitalize transition-all ${
                      caffeinePref === pref 
                        ? 'border-brand-600 bg-brand-50 text-brand-700' 
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">2</span>
                Time of Day
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'morning', name: 'Morning', icon: Clock },
                  { id: 'afternoon', name: 'Afternoon', icon: Clock },
                  { id: 'evening', name: 'Evening', icon: Clock }
                ].map((time) => {
                  const Icon = time.icon;
                  return (
                    <button
                      key={time.id}
                      onClick={() => setTimeOfDay(time.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        timeOfDay === time.id 
                          ? 'border-brand-600 bg-brand-50 text-brand-700' 
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold">{time.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <button
            onClick={getSuggestion}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Flame className="w-6 h-6" />
            Get Recommendation
          </button>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {suggestion ? (
              <motion.div 
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className={`p-10 text-white relative overflow-hidden ${suggestion.id === 'coffee' ? 'bg-amber-900' : 'bg-brand-600'}`}>
                    <div className="relative z-10">
                      <p className="text-white/70 uppercase tracking-widest text-xs font-bold mb-2">Your Recommendation</p>
                      <h2 className="text-4xl font-black mb-1">{suggestion.name}</h2>
                      <div className="flex items-center gap-2 text-white/80 text-sm mt-4">
                        <Thermometer className="w-4 h-4" />
                        <span className="font-bold">Intensity: {suggestion.intensity}</span>
                      </div>
                    </div>
                    {React.createElement(suggestion.icon, { className: "absolute -right-8 -bottom-8 w-48 h-48 text-white/10 rotate-12" })}
                  </div>

                  <div className="p-10 space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Why it works</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed">{suggestion.benefits}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Recipe</h4>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-slate-600 italic leading-relaxed pt-2">{suggestion.recipe}</p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                      <button 
                        onClick={() => setSuggestion(null)}
                        className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                      >
                        Try Another Preference
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Flame className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Boost Your Metabolism</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Configure your preferences on the left to see your personalized fat-burning drink recommendation.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
};

export default FatBurnTool;
