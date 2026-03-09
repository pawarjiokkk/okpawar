import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion } from 'motion/react';
import { 
  Dumbbell, 
  Weight, 
  Target, 
  Info, 
  Activity,
  Trash2,
  Zap
} from 'lucide-react';

type WeightUnit = 'kg' | 'lbs';

const ProteinShake = () => {
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [goal, setGoal] = useState('maintenance');
  const [result, setResult] = useState<number | null>(null);
  const [savedResults, setSavedResults] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('protein_results');
    if (saved) setSavedResults(JSON.parse(saved));
  }, []);

  const calculate = () => {
    let w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return;

    if (weightUnit === 'lbs') {
      w = w * 0.453592;
    }

    const factors: Record<string, number> = { maintenance: 1.2, muscle: 1.8, cutting: 1.5 };
    const dailyTotal = w * factors[goal];
    setResult(Math.round(dailyTotal * 0.3));
  };

  const handleSave = () => {
    if (result) {
      const newResult = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        value: result,
        goal: goal.charAt(0).toUpperCase() + goal.slice(1)
      };
      const updated = [newResult, ...savedResults].slice(0, 5);
      setSavedResults(updated);
      localStorage.setItem('protein_results', JSON.stringify(updated));
    }
  };

  return (
    <ToolLayout
      title="Protein Shake Calculator"
      description="Optimize your post-workout recovery by calculating the ideal protein amount for your shake based on body weight and fitness goals."
      howItWorks="We calculate your daily protein requirement based on your body weight and activity goal (Maintenance: 1.2g/kg, Fat Loss: 1.5g/kg, Muscle Building: 1.8g/kg). The calculator then recommends a single shake size that covers approximately 30% of your daily target, which is the optimal amount for muscle protein synthesis in one sitting."
      healthTips={[
        "The body can typically process 20-30g of protein efficiently in one meal.",
        "Consume your protein shake within 30-60 minutes post-workout for best results.",
        "Whey protein is absorbed quickly, while Casein is better before bed.",
        "Don't forget to include some fast-digesting carbs to help with glycogen replenishment."
      ]}
      faqs={[
        {
          question: "Can I drink too much protein?",
          answer: "Excess protein is generally safe for healthy individuals but may be stored as fat if it leads to a caloric surplus. It's best to spread intake throughout the day."
        },
        {
          question: "Is protein powder necessary?",
          answer: "No, you can get all your protein from whole foods. However, shakes are a convenient and fast-absorbing option post-workout."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Unit Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setWeightUnit('kg')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${weightUnit === 'kg' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
            >
              Metric (kg)
            </button>
            <button
              onClick={() => setWeightUnit('lbs')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${weightUnit === 'lbs' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
            >
              Imperial (lbs)
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Weight className="w-4 h-4 text-brand-500" />
                Your Body Weight
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={weightUnit === 'kg' ? 'e.g. 75' : 'e.g. 165'}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Target className="w-4 h-4 text-brand-500" />
                Fitness Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium appearance-none bg-white"
              >
                <option value="maintenance">Maintenance (1.2g/kg)</option>
                <option value="muscle">Muscle Building (1.8g/kg)</option>
                <option value="cutting">Fat Loss/Cutting (1.5g/kg)</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Dumbbell className="w-6 h-6" />
            Calculate Protein
          </button>

          {/* History */}
          {savedResults.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent History</h4>
                <button onClick={() => { setSavedResults([]); localStorage.removeItem('protein_results'); }} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {savedResults.map((res) => (
                  <div key={res.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500">{res.date}</span>
                    <span className="text-sm font-black text-slate-900">{res.value}g ({res.goal})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {result !== null ? (
            <>
              <ResultCard
                title="Target Shake Protein"
                value={result}
                unit="grams"
                interpretation={`Aim for this amount in your post-workout drink.`}
                tips={[
                  "Combine with 30-50g of carbohydrates for optimal recovery.",
                  "Drink within 45 minutes of finishing your workout."
                ]}
                onReset={() => {
                  setResult(null);
                  setWeight('');
                }}
                onSave={handleSave}
                color="indigo"
              />

              {/* Recovery Tip */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Recovery Optimization
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To maximize the benefits of your {result}g protein shake, ensure you are also getting enough sleep (7-9 hours) and staying hydrated. Protein alone is only one part of the muscle repair process.
                </p>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                <Dumbbell className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Optimize Recovery</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Enter your weight and goal to calculate your ideal post-workout protein intake.
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default ProteinShake;
