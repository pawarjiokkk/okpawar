import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Weight, 
  Zap, 
  Info, 
  Activity,
  Trash2,
  ChevronRight,
  Timer,
  Flame,
  BicepsFlexed
} from 'lucide-react';

const PostWorkoutTool = () => {
  const [weight, setWeight] = useState<string>('');
  const [intensity, setIntensity] = useState('moderate');
  const [result, setResult] = useState<{ carbs: number; protein: number; ratio: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return;

    let ratioNum = 2;
    let ratioStr = '2:1';
    if (intensity === 'intense') { ratioNum = 3; ratioStr = '3:1'; }
    if (intensity === 'endurance') { ratioNum = 4; ratioStr = '4:1'; }

    const protein = w * 0.4;
    const carbs = protein * ratioNum;

    setResult({
      carbs: Math.round(carbs),
      protein: Math.round(protein),
      ratio: ratioStr
    });
  };

  return (
    <ToolLayout
      title="Post-Workout Recovery Tool"
      description="Calculate the perfect carbohydrate-to-protein ratio for your post-workout recovery drink based on your body weight and training intensity."
      howItWorks="Recovery is about two main things: repairing muscle tissue (protein) and replenishing glycogen stores (carbohydrates). We use your body weight to determine a baseline protein target (0.4g/kg) and then apply a ratio based on your workout intensity (2:1 for moderate, 3:1 for intense, 4:1 for endurance) to calculate your carbohydrate needs."
      healthTips={[
        "Carbohydrates are essential post-workout to shuttle protein into your muscles.",
        "The 'anabolic window' is most effective within 30-60 minutes post-exercise.",
        "Endurance athletes need a higher carb-to-protein ratio (up to 4:1) to fully recover.",
        "Hydration is just as important; drink 500ml of water for every 0.5kg of weight lost during exercise."
      ]}
      faqs={[
        {
          question: "Why do I need carbs after lifting weights?",
          answer: "Lifting weights depletes muscle glycogen. Carbs spike insulin, which helps transport amino acids into the muscle cells for repair."
        },
        {
          question: "Can I just drink a protein shake?",
          answer: "You can, but adding a fast-digesting carb (like a banana or dextrose) will significantly improve your recovery speed and muscle growth."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          {/* Inputs */}
          <section className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Weight className="w-4 h-4 text-brand-500" />
                Body Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 75"
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">2</span>
                Training Intensity
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'moderate', name: 'Moderate (Strength/HIIT)', ratio: '2:1', icon: BicepsFlexed },
                  { id: 'intense', name: 'Intense (Heavy Lifting)', ratio: '3:1', icon: Flame },
                  { id: 'endurance', name: 'Endurance (Long Run/Cycle)', ratio: '4:1', icon: Timer },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setIntensity(item.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                        intensity === item.id 
                          ? 'border-brand-600 bg-brand-50' 
                          : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${intensity === item.id ? 'bg-brand-600 text-white' : 'bg-white text-slate-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${intensity === item.id ? 'text-brand-900' : 'text-slate-700'}`}>{item.name}</p>
                          <p className="text-[10px] text-slate-400">Target Ratio: {item.ratio}</p>
                        </div>
                      </div>
                      {intensity === item.id && <div className="w-2 h-2 rounded-full bg-brand-600"></div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <button
            onClick={calculate}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Zap className="w-6 h-6" />
            Calculate Recovery Needs
          </button>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-brand-600 p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-brand-100 uppercase tracking-widest text-xs font-bold mb-2">Optimal Recovery Ratio</p>
                      <h2 className="text-5xl font-black mb-1">{result.ratio}</h2>
                      <p className="text-brand-100 text-sm mt-4">Carbohydrates to Protein</p>
                    </div>
                    <Activity className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 rotate-12" />
                  </div>

                  <div className="p-10 space-y-10">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                        <p className="text-4xl font-black text-slate-900 mb-1">{result.carbs}g</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Carbohydrates</p>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                        <p className="text-4xl font-black text-slate-900 mb-1">{result.protein}g</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protein</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recovery Tip</h4>
                      <div className="flex items-start gap-4 bg-brand-50 p-6 rounded-2xl border border-brand-100">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 text-brand-600 shadow-sm">
                          <Info className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-brand-900 leading-relaxed pt-1">
                          Combine fast-acting carbs (like dextrose or fruit) with high-quality protein (like whey or pea protein) for the best results.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                      <button 
                        onClick={() => setResult(null)}
                        className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                      >
                        Reset Calculator
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Activity className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Optimize Your Recovery</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Enter your body weight and training intensity to calculate your ideal recovery drink targets.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PostWorkoutTool;
