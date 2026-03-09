
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../constants';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Droplets, 
  Blend, 
  Leaf, 
  Dumbbell, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = activeCategory 
    ? TOOLS.filter(tool => tool.category === activeCategory)
    : TOOLS;

  const scrollToTools = () => {
    const element = document.getElementById('tools');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoryIcons: Record<string, any> = {
    hydration: Droplets,
    smoothie: Blend,
    detox: Leaf,
    fitness: Dumbbell
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-bold mb-8">
                <Zap className="w-4 h-4" />
                <span>Trusted by 50,000+ Health Enthusiasts</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Optimize Your <br />
                <span className="text-brand-600">Liquid Nutrition</span> <br />
                With Precision.
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                Scientifically-backed calculators for hydration, smoothies, detox, and fitness. 
                Get personalized results in seconds—no login required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToTools}
                  className="btn-primary flex items-center justify-center gap-2 group"
                >
                  Explore All Tools
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link to="/about" className="btn-secondary flex items-center justify-center">
                  Learn Our Science
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      alt="User avatar"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <i key={i} className="fas fa-star text-xs"></i>)}
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">4.9/5 User Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100">
                <img 
                  src="https://picsum.photos/seed/health/800/800" 
                  alt="Healthy Lifestyle" 
                  className="rounded-[2.5rem] w-full h-auto shadow-inner"
                />
                
                {/* Floating Stats */}
                <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900">98%</p>
                      <p className="text-xs font-bold text-slate-400 uppercase">Accuracy Rate</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900">10+</p>
                      <p className="text-xs font-bold text-slate-400 uppercase">Pro Tools</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-200/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Select a focus area to find the perfect calculator for your needs.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat.id] || Zap;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => {
                    setActiveCategory(activeCategory === cat.id ? null : cat.id);
                    scrollToTools();
                  }}
                  className={`group p-8 rounded-[2.5rem] text-left transition-all hover:shadow-2xl hover:-translate-y-2 border-2 ${
                    activeCategory === cat.id 
                      ? 'border-brand-600 bg-brand-50' 
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    activeCategory === cat.id ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-brand-100 group-hover:text-brand-600'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className={`font-bold text-xl mb-2 ${activeCategory === cat.id ? 'text-brand-900' : 'text-slate-900'}`}>
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {cat.id === 'hydration' && 'Daily water & fluid balance.'}
                    {cat.id === 'smoothie' && 'Nutrients & sugar tracking.'}
                    {cat.id === 'detox' && 'Wellness & cleansing plans.'}
                    {cat.id === 'fitness' && 'Performance & recovery drinks.'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-24 px-4 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                {activeCategory 
                  ? `${CATEGORIES.find(c => c.id === activeCategory)?.name} Tools` 
                  : 'Featured Health Calculators'}
              </h2>
              <p className="text-slate-500">Professional-grade tools designed for accuracy and ease of use.</p>
            </div>
            {activeCategory && (
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-brand-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform"
              >
                View All Tools <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => {
              const Icon = categoryIcons[tool.category] || Zap;
              return (
                <Link 
                  key={tool.id} 
                  to={tool.path}
                  className="group bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-brand-200 transition-all flex flex-col"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-brand-50 transition-colors">
                    <Icon className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-700 transition-colors leading-tight">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 mb-10 flex-grow leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-600 font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Launch Tool <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {tool.category}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/h1/400/600" className="rounded-[2rem] w-full shadow-lg" alt="Health" />
                  <div className="bg-brand-600 p-8 rounded-[2rem] text-white">
                    <Award className="w-10 h-10 mb-4" />
                    <p className="text-2xl font-black">#1 Rated</p>
                    <p className="text-sm opacity-80">Liquid Nutrition Platform</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                    <Clock className="w-10 h-10 mb-4 text-brand-400" />
                    <p className="text-2xl font-black">Instant</p>
                    <p className="text-sm opacity-80">Results in Real-time</p>
                  </div>
                  <img src="https://picsum.photos/seed/h2/400/600" className="rounded-[2rem] w-full shadow-lg" alt="Fitness" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Built for <span className="text-brand-600">Accuracy</span>, <br />
                Designed for You.
              </h2>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                We combine the latest nutritional science with a seamless user experience to help you make informed decisions about your liquid intake.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Privacy First", desc: "We don't store your data. All calculations happen locally on your device.", icon: ShieldCheck },
                  { title: "Scientific Formulas", desc: "Our tools use standardized formulas from world-leading health organizations.", icon: CheckCircle2 },
                  { title: "Global Standards", desc: "Supports both Metric and Imperial systems for users worldwide.", icon: Award },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                      {React.createElement(item.icon, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-32 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Health Insights</h2>
              <p className="text-slate-400 text-xl">Expert advice on hydration, nutrition, and fitness performance.</p>
            </div>
            <Link to="/blog" className="btn-primary">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                id: "science-of-hydration",
                title: "The Science of Hydration: How Much Water Do You Really Need?",
                img: "https://picsum.photos/id/155/600/400",
                date: "March 15, 2024"
              },
              {
                id: "smoothie-vs-juice",
                title: "Smoothie vs. Juice: Which One is Better for Weight Loss?",
                img: "https://picsum.photos/id/429/600/400",
                date: "March 12, 2024"
              },
              {
                id: "post-workout-recovery",
                title: "Post-Workout Recovery: The Golden Hour of Nutrition",
                img: "https://picsum.photos/id/445/600/400",
                date: "March 10, 2024"
              }
            ].map((post, i) => (
              <Link key={i} to={`/blog/${post.id}`} className="group block">
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-8">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-2">{post.date}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-slate prose-lg max-w-none text-slate-500 leading-relaxed">
            <h2 className="text-3xl font-black text-slate-900 mb-8">The Importance of Liquid Nutrition</h2>
            <p>
              Liquid nutrition is often the most overlooked component of a successful fitness journey. 
              Whether it's staying adequately hydrated with our <strong>Daily Water Intake Calculator</strong> or 
              optimizing your recovery with a <strong>Protein Shake Calculator</strong>, what you drink 
              is just as important as what you eat. 
            </p>
            <p>
              Our hydration tools are designed to provide localized and personalized results for users 
              across the USA, UK, India, and beyond. Water plays a crucial role in metabolism, joint health, 
              and cognitive function. By using our <strong>Body Weight Hydration Tool</strong>, you can 
              ensure your body has the resources it needs to perform at its peak.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

