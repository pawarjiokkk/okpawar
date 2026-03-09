import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion } from 'motion/react';
import { 
  Droplets, 
  Weight, 
  Activity, 
  Thermometer, 
  Info,
  BarChart3,
  Trash2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const WaterIntake = () => {
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<string>('30');
  const [climate, setClimate] = useState<string>('moderate');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<number | null>(null);
  const [savedResults, setSavedResults] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('water_results');
    if (saved) setSavedResults(JSON.parse(saved));
  }, []);

  const calculate = () => {
    if (!weight || isNaN(Number(weight))) return;

    let weightInKg = Number(weight);
    if (unit === 'imperial') {
      weightInKg = weightInKg * 0.453592;
    }

    // Base calculation: 35ml per kg
    let totalMl = weightInKg * 35;

    // Activity adjustment: 350ml per 30 mins of exercise
    const exerciseMinutes = Number(activity);
    totalMl += (exerciseMinutes / 30) * 350;

    // Climate adjustment
    if (climate === 'hot') totalMl += 500;
    if (climate === 'cold') totalMl -= 200;

    setResult(Math.round(totalMl));
  };

  const handleSave = () => {
    if (result) {
      const newResult = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        value: result,
        unit: 'ml'
      };
      const updated = [newResult, ...savedResults].slice(0, 5);
      setSavedResults(updated);
      localStorage.setItem('water_results', JSON.stringify(updated));
    }
  };

  const clearHistory = () => {
    setSavedResults([]);
    localStorage.removeItem('water_results');
  };

  const chartData = [
    { name: 'Your Goal', value: result || 0 },
    { name: 'Avg Person', value: 2500 },
    { name: 'Athlete', value: 3500 },
  ];

  return (
    <ToolLayout
      title="Water Intake Calculator"
      description="Calculate your personalized daily hydration goal based on weight, activity level, and climate conditions."
      howItWorks="Our formula uses the standard 35ml per kilogram of body weight as a baseline. We then adjust for physical activity (adding ~350ml per 30 mins of exercise) and environmental temperature to ensure your body maintains optimal fluid balance."
      healthTips={[
        "Drink a glass of water immediately after waking up to jumpstart your metabolism.",
        "Don't wait until you're thirsty; thirst is a late sign of dehydration.",
        "Eat water-rich foods like cucumber, watermelon, and strawberries.",
        "Carry a reusable water bottle to track your progress throughout the day."
      ]}
      faqs={[
        {
          question: "How much water should I drink a day?",
          answer: "While the '8 glasses' rule is a good starting point, individual needs vary based on weight, activity, and climate. Most adults need between 2.5 to 3.5 liters per day."
        },
        {
          question: "Can I drink too much water?",
          answer: "Yes, a condition called hyponatremia can occur if you drink excessive amounts of water in a short period, diluting your blood's sodium levels. Always listen to your body."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Unit Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setUnit('metric')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${unit === 'metric' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
            >
              Metric (kg/ml)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${unit === 'imperial' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
            >
              Imperial (lb/oz)
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Weight className="w-4 h-4 text-brand-500" />
                Your Body Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 155'}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Activity className="w-4 h-4 text-brand-500" />
                Daily Exercise (minutes)
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium appearance-none bg-white"
              >
                <option value="0">Sedentary (0 min)</option>
                <option value="30">Light (30 min)</option>
                <option value="60">Moderate (60 min)</option>
                <option value="120">Active (120+ min)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Thermometer className="w-4 h-4 text-brand-500" />
                Climate Conditions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['cold', 'moderate', 'hot'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setClimate(c)}
                    className={`py-3 rounded-xl text-sm font-bold capitalize border-2 transition-all ${
                      climate === c 
                        ? 'border-brand-600 bg-brand-50 text-brand-700' 
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Droplets className="w-6 h-6" />
            Calculate Goal
          </button>

          {/* History */}
          {savedResults.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent History</h4>
                <button onClick={clearHistory} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {savedResults.map((res) => (
                  <div key={res.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500">{res.date}</span>
                    <span className="text-sm font-black text-slate-900">{res.value} {res.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {result ? (
            <>
              <ResultCard
                title="Daily Water Goal"
                value={unit === 'metric' ? result : Math.round(result * 0.033814)}
                unit={unit === 'metric' ? 'ml' : 'oz'}
                interpretation={`That's about ${Math.round(result / 250)} standard glasses.`}
                onReset={() => {
                  setResult(null);
                  setWeight('');
                }}
                onSave={handleSave}
                color="brand"
              />

              {/* Chart */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-brand-500" />
                  <h4 className="font-bold text-slate-900">Hydration Comparison</h4>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#0ea5e9' : '#e2e8f0'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center italic">
                  Comparison based on standard activity levels.
                </p>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                <Droplets className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Calculate?</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Enter your details to see your personalized daily hydration requirement.
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default WaterIntake;
