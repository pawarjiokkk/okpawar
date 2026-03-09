import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { ResultCard } from '../components/ResultCard';
import { motion } from 'motion/react';
import { 
  GlassWater, 
  Info, 
  Activity,
  Trash2,
  Apple,
  Citrus,
  Carrot,
  Grape,
  Circle,
  Network,
  Leaf,
  Soup
} from 'lucide-react';

const FRUIT_DATA: Record<string, { name: string; sugarPer100ml: number; icon: any; color: string }> = {
  apple: { name: 'Apple', sugarPer100ml: 10.4, icon: Apple, color: 'text-red-500' },
  orange: { name: 'Orange', sugarPer100ml: 8.4, icon: Citrus, color: 'text-orange-500' },
  carrot: { name: 'Carrot', sugarPer100ml: 4.7, icon: Carrot, color: 'text-orange-600' },
  beetroot: { name: 'Beetroot', sugarPer100ml: 6.8, icon: Leaf, color: 'text-purple-600' },
  grape: { name: 'Grape', sugarPer100ml: 15.5, icon: Grape, color: 'text-indigo-600' },
  pomegranate: { name: 'Pomegranate', sugarPer100ml: 12.6, icon: Circle, color: 'text-red-700' },
  lemon: { name: 'Lemon/Lime', sugarPer100ml: 2.5, icon: Citrus, color: 'text-yellow-500' },
  celery: { name: 'Celery', sugarPer100ml: 1.8, icon: Leaf, color: 'text-emerald-500' },
};

const JuiceSugar = () => {
  const [fruitType, setFruitType] = useState('orange');
  const [volume, setVolume] = useState<string>('250');
  const [unit, setUnit] = useState<'ml' | 'fl oz'>('ml');
  const [result, setResult] = useState<{ grams: number; teaspoons: number; volumeInMl: number } | null>(null);
  const [savedResults, setSavedResults] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('juice_results');
    if (saved) setSavedResults(JSON.parse(saved));
  }, []);

  const calculate = () => {
    let vol = parseFloat(volume);
    const fruit = FRUIT_DATA[fruitType];
    if (isNaN(vol) || vol <= 0 || !fruit) return;

    const volumeInMl = unit === 'fl oz' ? vol * 29.5735 : vol;
    const grams = (volumeInMl / 100) * fruit.sugarPer100ml;
    const teaspoons = grams / 4.2;

    setResult({
      grams: parseFloat(grams.toFixed(1)),
      teaspoons: parseFloat(teaspoons.toFixed(1)),
      volumeInMl: volumeInMl
    });
  };

  const handleSave = () => {
    if (result) {
      const newResult = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        value: result.grams,
        fruit: FRUIT_DATA[fruitType].name
      };
      const updated = [newResult, ...savedResults].slice(0, 5);
      setSavedResults(updated);
      localStorage.setItem('juice_results', JSON.stringify(updated));
    }
  };

  return (
    <ToolLayout
      title="Juice Sugar Calculator"
      description="Estimate the natural sugar content in your fresh-pressed or store-bought juices. Compare sugar levels across different fruit and vegetable bases."
      howItWorks="We use standardized nutritional data for 100ml of fresh juice. By multiplying the sugar density of your chosen base by the total volume, we estimate the total grams of natural fructose. We also provide a teaspoon equivalent (approx. 4.2g per tsp) to help you visualize the sugar content."
      healthTips={[
        "Fruit juice lacks the fiber of whole fruit, leading to faster sugar absorption.",
        "Vegetable-based juices (celery, cucumber) are significantly lower in sugar.",
        "Dilute your juice with water or sparkling water to reduce sugar per serving.",
        "Limit fruit juice intake to 150ml per day as per WHO guidelines."
      ]}
      faqs={[
        {
          question: "Is natural fruit sugar better than added sugar?",
          answer: "While it comes with vitamins and antioxidants, the body processes the fructose in juice similarly to added sugar because the fiber is removed."
        },
        {
          question: "Which juice has the least sugar?",
          answer: "Vegetable juices like celery, cucumber, and leafy greens have the lowest sugar content, typically under 3g per 100ml."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Fruit Selection */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">1</span>
              Select Juice Base
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(FRUIT_DATA).map(([key, data]) => {
                const Icon = data.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setFruitType(key)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      fruitType === key 
                        ? 'border-brand-600 bg-brand-50' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${fruitType === key ? data.color : 'text-slate-400'}`} />
                    <span className={`text-[10px] font-bold uppercase ${fruitType === key ? 'text-brand-900' : 'text-slate-500'}`}>
                      {data.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Volume Input */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px]">2</span>
              Enter Volume
            </h3>
            <div className="flex gap-4">
              <div className="flex-grow">
                <input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder={unit === 'ml' ? 'e.g. 250' : 'e.g. 8'}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-lg font-medium"
                />
              </div>
              <div className="flex p-1 bg-slate-100 rounded-2xl shrink-0">
                <button
                  onClick={() => setUnit('ml')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${unit === 'ml' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
                >
                  ML
                </button>
                <button
                  onClick={() => setUnit('fl oz')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${unit === 'fl oz' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'}`}
                >
                  OZ
                </button>
              </div>
            </div>
          </section>

          <button
            onClick={calculate}
            className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3"
          >
            <GlassWater className="w-6 h-6" />
            Estimate Sugar
          </button>

          {/* History */}
          {savedResults.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent History</h4>
                <button onClick={() => { setSavedResults([]); localStorage.removeItem('juice_results'); }} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {savedResults.map((res) => (
                  <div key={res.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500">{res.date}</span>
                    <span className="text-sm font-black text-slate-900">{res.value}g ({res.fruit})</span>
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
                title="Estimated Sugar"
                value={result.grams}
                unit="grams"
                interpretation={`That's approximately ${result.teaspoons} teaspoons of sugar.`}
                tips={[
                  result.grams > 25 
                    ? "This is a high-sugar drink. Consider diluting it with water." 
                    : "This is a relatively low-sugar choice. Enjoy in moderation!"
                ]}
                onReset={() => {
                  setResult(null);
                  setVolume('250');
                }}
                onSave={handleSave}
                color="orange"
              />

              {/* Sugar Visualization */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Soup className="w-5 h-5 text-orange-500" />
                  Visual Representation
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[...Array(Math.floor(result.teaspoons))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="w-8 h-8 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center text-orange-500"
                    >
                      <Soup className="w-4 h-4" />
                    </motion.div>
                  ))}
                  {result.teaspoons % 1 > 0.2 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-orange-50/50 border border-dashed border-orange-200 rounded-lg flex items-center justify-center text-orange-300"
                    >
                      <Soup className="w-3 h-3 opacity-50" />
                    </motion.div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-6 text-center italic">
                  Each icon represents 1 teaspoon (approx. 4.2g) of natural sugar.
                </p>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                <GlassWater className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Check Sugar Levels</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Select a juice base and volume to estimate the natural sugar content.
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default JuiceSugar;
