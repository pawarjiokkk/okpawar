import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion } from 'motion/react';
import { 
  Scale, 
  Ruler, 
  Info, 
  Activity,
  Trash2,
  HeartPulse
} from 'lucide-react';

type UnitSystem = 'metric' | 'imperial';

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [savedResults, setSavedResults] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bmi_results');
    if (saved) setSavedResults(JSON.parse(saved));
  }, []);

  const calculate = () => {
    let w = parseFloat(weight);
    let h: number;

    if (unitSystem === 'metric') {
      h = parseFloat(height) / 100; // cm to m
      if (isNaN(w) || isNaN(h) || h <= 0 || w <= 0) return;
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    } else {
      const feet = parseFloat(height) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = (feet * 12) + inches;
      if (isNaN(w) || totalInches <= 0 || w <= 0) return;
      
      // BMI = (weight in lbs / (height in inches)^2) * 703
      h = totalInches;
      setBmi(parseFloat(((w / (h * h)) * 703).toFixed(1)));
    }
  };

  const handleSave = () => {
    if (bmi) {
      const newResult = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        value: bmi,
        status: getStatus(bmi).text
      };
      const updated = [newResult, ...savedResults].slice(0, 5);
      setSavedResults(updated);
      localStorage.setItem('bmi_results', JSON.stringify(updated));
    }
  };

  const getStatus = (val: number) => {
    if (val < 18.5) return { text: "Underweight", color: "text-blue-500", bg: "bg-blue-500", desc: "You may need to increase your liquid nutrition and caloric intake." };
    if (val < 25) return { text: "Normal weight", color: "text-emerald-500", bg: "bg-emerald-500", desc: "Great job! Maintain your current hydration and nutrition balance." };
    if (val < 30) return { text: "Overweight", color: "text-orange-500", bg: "bg-orange-500", desc: "Consider focusing on low-sugar juices and high-fiber smoothies." };
    return { text: "Obese", color: "text-red-500", bg: "bg-red-500", desc: "Focus on hydration with water and vegetable-based juices to support metabolism." };
  };

  const getPointerPosition = (val: number) => {
    // Range 15 to 40
    const min = 15;
    const max = 40;
    const clamped = Math.min(Math.max(val, min), max);
    return ((clamped - min) / (max - min)) * 100;
  };

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Body Mass Index (BMI) is a simple index of weight-for-height used to classify weight status in adults."
      howItWorks="The BMI is calculated by dividing your weight in kilograms by the square of your height in meters. For imperial units, we use the formula: (weight in lbs / height in inches²) × 703. This provides a standardized score that correlates with body fat levels for most people."
      healthTips={[
        "BMI is a screening tool, not a diagnostic of body fatness or health.",
        "Muscle is denser than fat, so athletic individuals may have a higher BMI.",
        "Focus on body composition and waist circumference for a more complete health picture.",
        "Maintain a balanced diet rich in whole foods and stay hydrated."
      ]}
      faqs={[
        {
          question: "What is a healthy BMI range?",
          answer: "A healthy BMI for most adults is between 18.5 and 24.9."
        },
        {
          question: "Does BMI apply to children?",
          answer: "BMI for children and teens is calculated the same way but interpreted differently using age-and-sex-specific percentiles."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Unit Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${unitSystem === 'metric' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${unitSystem === 'imperial' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
            >
              Imperial (lb/in)
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Scale className="w-4 h-4 text-brand-500" />
                Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unitSystem === 'metric' ? 'e.g. 70' : 'e.g. 155'}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
              />
            </div>

            {unitSystem === 'metric' ? (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                  <Ruler className="w-4 h-4 text-brand-500" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <Ruler className="w-4 h-4 text-brand-500" />
                    Height (ft)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="ft"
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="w-4" />
                    Inches
                  </label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="in"
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={calculate}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <Activity className="w-6 h-6" />
            Calculate BMI
          </button>

          {/* History */}
          {savedResults.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent History</h4>
                <button onClick={() => { setSavedResults([]); localStorage.removeItem('bmi_results'); }} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {savedResults.map((res) => (
                  <div key={res.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500">{res.date}</span>
                    <span className="text-sm font-black text-slate-900">{res.value} ({res.status})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {bmi !== null ? (
            <>
              <ResultCard
                title="Your BMI Score"
                value={bmi}
                interpretation={getStatus(bmi).text}
                tips={[getStatus(bmi).desc]}
                onReset={() => {
                  setBmi(null);
                  setWeight('');
                  setHeight('');
                  setHeightInches('');
                }}
                onSave={handleSave}
                color={bmi < 18.5 ? 'brand' : bmi < 25 ? 'emerald' : bmi < 30 ? 'orange' : 'indigo'}
              />

              {/* BMI Scale */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-brand-500" />
                  BMI Category Scale
                </h4>
                
                <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden flex mb-2">
                  <div className="h-full bg-blue-400" style={{ width: '14%' }}></div>
                  <div className="h-full bg-emerald-500" style={{ width: '26%' }}></div>
                  <div className="h-full bg-orange-400" style={{ width: '20%' }}></div>
                  <div className="h-full bg-red-500" style={{ width: '40%' }}></div>
                </div>
                
                <div className="relative w-full h-6">
                  <motion.div 
                    initial={{ left: 0 }}
                    animate={{ left: `${getPointerPosition(bmi)}%` }}
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  >
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-slate-900"></div>
                    <span className="text-[10px] font-black mt-1">{bmi}</span>
                  </motion.div>
                </div>

                <div className="grid grid-cols-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-4">
                  <div className="text-center">Under</div>
                  <div className="text-center">Normal</div>
                  <div className="text-center">Over</div>
                  <div className="text-center">Obese</div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                <HeartPulse className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Check Your BMI</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Enter your height and weight to see your BMI score and health category.
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default BMICalculator;
