
import React from 'react';
import { Link } from 'react-router-dom';
import { FAQ as FAQType } from '../types';
import { Info, HelpCircle, Lightbulb, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  faqs: FAQType[];
  howItWorks?: string;
  healthTips?: string[];
  disclaimer?: string;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ 
  title, 
  description, 
  children, 
  faqs, 
  howItWorks,
  healthTips,
  disclaimer = "Results provided by FitLiquidLife are estimates based on standard health formulas. Please consult a medical professional for personalized advice." 
}) => {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-600 font-bold text-sm transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Tools
          </Link>
          
          <div className="block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              Health Tool
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">{title}</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 -mt-10">
        {/* Main Calculator Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 md:p-12 mb-12"
        >
          {children}
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* How it works */}
          {howItWorks && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">How This Calculator Works</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {howItWorks}
              </p>
            </div>
          )}

          {/* Health Tips */}
          {healthTips && healthTips.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Expert Health Tips</h3>
              <ul className="space-y-3">
                {healthTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FAQs */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Common Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-200 transition-colors">
                <h4 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-brand-400" />
              <h3 className="text-xl font-bold">Medical Disclaimer</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </section>
      </div>
    </div>
  );
};

