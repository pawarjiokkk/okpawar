
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import WaterIntake from './pages/WaterIntake';
import SmoothieCal from './pages/SmoothieCal';
import ProteinShake from './pages/ProteinShake';
import BMICalculator from './pages/BMICalculator';
import JuiceSugar from './pages/JuiceSugar';
import DetoxPlanner from './pages/DetoxPlanner';
import FatBurnTool from './pages/FatBurnTool';
import ImmunityBoostTool from './pages/ImmunityBoostTool';
import PostWorkoutTool from './pages/PostWorkoutTool';
import BlogPost from './pages/BlogPost';

// Legal & Info Pages
const StaticPage = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <div className="min-h-screen py-20 px-4 bg-slate-50">
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-sm prose prose-slate prose-blue">
      <h1 className="text-4xl font-black text-slate-900 mb-8">{title}</h1>
      <div className="text-slate-600 leading-relaxed space-y-6">
        {content}
      </div>
      <div className="mt-12 pt-8 border-t border-slate-100">
        <a href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
          <i className="fas fa-arrow-left text-sm"></i> Back to Homepage
        </a>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/water-intake" element={<WaterIntake />} />
          <Route path="/weight-hydration" element={<WaterIntake />} /> {/* Re-using logic for MVP */}
          <Route path="/smoothie-calculator" element={<SmoothieCal />} />
          <Route path="/juice-sugar" element={<JuiceSugar />} />
          <Route path="/detox-planner" element={<DetoxPlanner />} />
          <Route path="/protein-calculator" element={<ProteinShake />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/fat-burn-suggestion" element={<FatBurnTool />} />
          <Route path="/post-workout-drink" element={<PostWorkoutTool />} />
          <Route path="/immunity-boost" element={<ImmunityBoostTool />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          <Route path="/about" element={<StaticPage title="About FitLiquidLife" content={
            <>
              <p>FitLiquidLife is a professional health and wellness platform dedicated to providing accurate, science-based liquid nutrition calculators. Our mission is to simplify hydration and nutrition tracking for everyone, from elite athletes to health-conscious individuals.</p>
              <p>Founded on the principle that "what you drink is as important as what you eat," we've developed a suite of tools to help you optimize your water intake, smoothie recipes, juice sugar levels, and post-workout recovery drinks.</p>
              <h3 className="text-xl font-bold text-slate-900">Our Commitment</h3>
              <ul>
                <li><strong>Accuracy:</strong> All our formulas are based on established nutritional and hydration standards.</li>
                <li><strong>Privacy:</strong> We never require a login or store your personal health data.</li>
                <li><strong>Accessibility:</strong> Our tools are 100% free and optimized for all devices.</li>
              </ul>
            </>
          } />} />

          <Route path="/contact" element={<StaticPage title="Contact Us" content={
            <>
              <p>Have questions, feedback, or a suggestion for a new tool? We'd love to hear from you!</p>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
                <p className="font-bold text-blue-900 mb-2">Email Support</p>
                <p className="text-blue-700">support@fitliquidlife.com</p>
              </div>
              <p className="mt-8">We typically respond to all inquiries within 24-48 business hours.</p>
            </>
          } />} />

          <Route path="/privacy" element={<StaticPage title="Privacy Policy" content={
            <>
              <p>At FitLiquidLife, accessible from fitliquidlife.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by FitLiquidLife and how we use it.</p>
              <h3 className="text-xl font-bold text-slate-900">Log Files</h3>
              <p>FitLiquidLife follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
              <h3 className="text-xl font-bold text-slate-900">Cookies and Web Beacons</h3>
              <p>Like any other website, FitLiquidLife uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
              <h3 className="text-xl font-bold text-slate-900">Google DoubleClick DART Cookie</h3>
              <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.</p>
            </>
          } />} />

          <Route path="/terms" element={<StaticPage title="Terms of Service" content={
            <>
              <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use FitLiquidLife if you do not agree to take all of the terms and conditions stated on this page.</p>
              <h3 className="text-xl font-bold text-slate-900">License</h3>
              <p>Unless otherwise stated, FitLiquidLife and/or its licensors own the intellectual property rights for all material on FitLiquidLife. All intellectual property rights are reserved.</p>
              <h3 className="text-xl font-bold text-slate-900">User Responsibilities</h3>
              <p>You must not: Republish material from FitLiquidLife, Sell, rent or sub-license material from FitLiquidLife, Reproduce, duplicate or copy material from FitLiquidLife.</p>
            </>
          } />} />

          <Route path="/disclaimer" element={<StaticPage title="Medical Disclaimer" content={
            <>
              <div className="bg-orange-50 p-8 rounded-3xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-black mb-4">Important Notice</h2>
                <p className="font-medium leading-relaxed">
                  The information provided by FitLiquidLife ("we," "us," or "our") on fitliquidlife.com is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
                </p>
                <p className="mt-4 font-bold">
                  UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
                </p>
              </div>
              <p className="mt-8">
                The site cannot and does not contain medical/health advice. The medical/health information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of medical/health advice.
              </p>
            </>
          } />} />

          <Route path="/cookie-policy" element={<StaticPage title="Cookie Policy" content={
            <>
              <p>This is the Cookie Policy for FitLiquidLife, accessible from fitliquidlife.com.</p>
              <h3 className="text-xl font-bold text-slate-900">What Are Cookies</h3>
              <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
              <h3 className="text-xl font-bold text-slate-900">How We Use Cookies</h3>
              <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
            </>
          } />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
