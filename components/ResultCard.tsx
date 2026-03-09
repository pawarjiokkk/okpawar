
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, RotateCcw, Save, Check, Download } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  interpretation?: string;
  tips?: string[];
  onReset?: () => void;
  onSave?: () => void;
  className?: string;
  color?: 'brand' | 'emerald' | 'orange' | 'indigo';
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  unit,
  interpretation,
  tips,
  onReset,
  onSave,
  className,
  color = 'brand'
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    const text = `${title}: ${value}${unit ? ' ' + unit : ''}${interpretation ? ' - ' + interpretation : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = `Check out my ${title} result on FitLiquidLife: ${value}${unit ? ' ' + unit : ''}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FitLiquidLife Result',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
      alert('Link and result copied to clipboard!');
    }
  };

  const handleSave = () => {
    if (onSave) onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const colorClasses = {
    brand: 'bg-brand-600 text-white shadow-brand-600/20',
    emerald: 'bg-emerald-600 text-white shadow-emerald-600/20',
    orange: 'bg-orange-600 text-white shadow-orange-600/20',
    indigo: 'bg-indigo-600 text-white shadow-indigo-600/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl", className)}
    >
      <div className={cn("p-8 text-center", colorClasses[color])}>
        <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">{title}</p>
        <div className="flex items-baseline justify-center gap-2">
          <h2 className="text-6xl font-black">{value}</h2>
          {unit && <span className="text-2xl font-bold opacity-80">{unit}</span>}
        </div>
        {interpretation && (
          <p className="mt-4 text-lg font-medium opacity-90">{interpretation}</p>
        )}
      </div>

      <div className="p-8">
        {tips && tips.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Personalized Tips</h4>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-600 mb-1" /> : <Copy className="w-5 h-5 text-slate-600 mb-1" />}
            <span className="text-[10px] font-bold uppercase text-slate-500">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
          >
            <Share2 className="w-5 h-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-bold uppercase text-slate-500">Share</span>
          </button>

          <button
            onClick={handleSave}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
          >
            {saved ? <Check className="w-5 h-5 text-emerald-600 mb-1" /> : <Save className="w-5 h-5 text-slate-600 mb-1" />}
            <span className="text-[10px] font-bold uppercase text-slate-500">{saved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onReset}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
          >
            <RotateCcw className="w-5 h-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-bold uppercase text-slate-500">Reset</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
