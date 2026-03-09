
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Droplets, 
  ChevronRight, 
  Shield, 
  Mail, 
  Info, 
  FileText, 
  Cookie,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/#tools' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              FitLiquid<span className="text-brand-600">Life</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-bold transition-colors hover:text-brand-600 ${
                  location.pathname === link.path ? 'text-brand-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/#tools" 
              onClick={() => handleNavClick('/#tools')}
              className="btn-primary py-2.5 px-6 text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="block text-lg font-bold text-slate-900"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/#tools" 
                onClick={() => handleNavClick('/#tools')}
                className="btn-primary w-full text-center block"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Calculators',
      links: [
        { name: 'Water Intake', path: '/water-intake' },
        { name: 'Smoothie Calories', path: '/smoothie-calculator' },
        { name: 'Protein Shake', path: '/protein-calculator' },
        { name: 'BMI Calculator', path: '/bmi-calculator' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Latest Blog', path: '/blog' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
        { name: 'Medical Disclaimer', path: '/disclaimer' },
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">FitLiquidLife</span>
            </Link>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-8">
              Empowering global wellness through precision liquid nutrition tools. 
              Scientifically-backed, user-focused, and 100% free.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm hover:text-brand-400 transition-colors flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <span>&copy; {currentYear} FitLiquidLife</span>
            <span className="w-1 h-1 rounded-full bg-slate-800"></span>
            <span>Global Health Standards</span>
          </div>
          <p className="text-xs text-slate-700 italic">
            Helping the world hydrate, one glass at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 inset-x-6 z-[200] md:max-w-2xl md:mx-auto"
          >
            <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 shrink-0 bg-brand-600/20 rounded-2xl flex items-center justify-center text-brand-400">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h4 className="font-bold mb-1">Cookie Preferences</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We use cookies to enhance your experience. By continuing, you agree to our 
                  <Link to="/cookie-policy" className="text-brand-400 hover:underline ml-1">Cookie Policy</Link>.
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={acceptCookies}
                  className="btn-primary py-2.5 px-8 text-sm w-full md:w-auto"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

