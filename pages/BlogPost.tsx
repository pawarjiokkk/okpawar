
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';

const BLOG_POSTS: Record<string, { title: string; date: string; category: string; img: string; content: React.ReactNode }> = {
  'science-of-hydration': {
    title: "The Science of Hydration: How Much Water Do You Really Need?",
    date: "March 15, 2024",
    category: "Hydration",
    img: "https://picsum.photos/id/155/1200/600",
    content: (
      <div className="space-y-6">
        <p className="text-lg font-medium text-slate-700 leading-relaxed">
          For decades, we've been told to drink exactly eight glasses of water a day. But where did this "8x8" rule come from, and is it actually supported by science? As it turns out, hydration is far more personal than a single number.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Myth of the Eight-Glass Rule</h2>
        <p>
          The origin of the eight-glass rule is murky, but many researchers believe it stems from a 1945 recommendation that didn't account for the water we get from food. In reality, about 20% of our daily fluid intake comes from fruits, vegetables, and other solid foods. If you're eating a diet rich in produce, you might need significantly less "bottled" water than someone eating processed foods.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Biological Factors: Why You Are Unique</h2>
        <p>
          Your hydration needs are determined by a complex interplay of factors:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Body Weight:</strong> Larger bodies require more fluid to maintain cellular function and blood volume.</li>
          <li><strong>Activity Level:</strong> Sweat is your body's cooling system. If you're an athlete or working in a physical job, your fluid turnover is much higher.</li>
          <li><strong>Climate:</strong> Humidity and altitude both increase fluid loss through skin and respiration.</li>
          <li><strong>Metabolic Rate:</strong> Even the efficiency of your digestion plays a role in how much water your body processes.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Benefits of Optimal Hydration</h2>
        <p>
          Staying properly hydrated isn't just about avoiding thirst; it's about peak performance. Water is essential for:
        </p>
        <p>
          <strong>1. Cognitive Function:</strong> Even mild dehydration (1-2% loss of body weight) can impair concentration, memory, and mood. Your brain is roughly 75% water; when it's dry, it doesn't think clearly.
        </p>
        <p>
          <strong>2. Metabolic Efficiency:</strong> Drinking water has been shown to temporarily boost metabolism through a process called water-induced thermogenesis. It also helps the kidneys filter waste more effectively.
        </p>
        <p>
          <strong>3. Physical Performance:</strong> Muscles that are dehydrated are prone to cramping and fatigue. Water acts as a lubricant for joints and a shock absorber for the spinal cord.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Practical Tips for Your Daily Routine</h2>
        <p>
          Instead of counting glasses, try these science-backed strategies:
        </p>
        <p>
          First, check your urine color. A pale straw color is the gold standard. If it's dark yellow, you're behind. Second, drink a glass of water immediately upon waking. You lose significant fluid overnight through breathing. Third, use a tool like our <strong>Daily Water Intake Calculator</strong> to get a personalized baseline based on your specific weight and activity level.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Conclusion</h2>
        <p>
          Hydration is a dynamic process. Some days you'll need more, some days less. By listening to your body's signals and understanding the science behind fluid balance, you can ensure you're always performing at your best. Remember, water isn't just a drink—it's the most vital nutrient in your body.
        </p>
        <div className="h-20"></div>
      </div>
    )
  },
  'smoothie-vs-juice': {
    title: "Smoothie vs. Juice: Which One is Better for Weight Loss?",
    date: "March 12, 2024",
    category: "Nutrition",
    img: "https://picsum.photos/id/429/1200/600",
    content: (
      <div className="space-y-6">
        <p className="text-lg font-medium text-slate-700 leading-relaxed">
          In the world of liquid nutrition, two giants stand tall: the smoothie and the fresh-pressed juice. While both offer a concentrated burst of vitamins, they affect your body—and your weight loss goals—in very different ways.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Juicing Deep Dive: Pure Nutrients, No Fiber</h2>
        <p>
          Juicing involves extracting the liquid from fruits and vegetables, leaving the pulp (fiber) behind. 
        </p>
        <p>
          <strong>The Pros:</strong> Juices provide an immediate infusion of vitamins and minerals into the bloodstream. Because there's no fiber to digest, the body doesn't have to work hard to absorb these nutrients. This is why many people feel an "instant" energy boost after a green juice.
        </p>
        <p>
          <strong>The Cons:</strong> The lack of fiber is a double-edged sword. Without fiber to slow down absorption, the natural sugars in fruit juices hit your bloodstream all at once, causing a spike in insulin. High insulin levels tell your body to store fat rather than burn it. Furthermore, juices are rarely filling, meaning you'll likely be hungry again within the hour.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Smoothie Advantage: The Power of the Whole Food</h2>
        <p>
          Smoothies are made by blending whole fruits and vegetables into a thick liquid, keeping all the fiber intact.
        </p>
        <p>
          <strong>The Pros:</strong> Fiber is the secret weapon of weight loss. It adds bulk to your diet, slows down the digestion of sugar, and keeps you feeling full for longer. A well-made smoothie can serve as a complete meal replacement if it includes protein and healthy fats.
        </p>
        <p>
          <strong>The Cons:</strong> Smoothies can be calorie bombs. It's easy to toss in a banana, a cup of yogurt, nut butter, and honey without realizing you've created an 800-calorie drink. This is where our <strong>Smoothie Calories Calculator</strong> becomes essential for tracking your intake.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Weight Loss Verdict</h2>
        <p>
          If your primary goal is weight loss, <strong>smoothies generally win</strong>. The combination of fiber and the ability to add protein makes them a superior tool for appetite control. However, the "perfect" weight loss drink is a green smoothie: 70% leafy greens and 30% low-sugar fruit (like berries), blended with a protein source.
        </p>
        <p>
          Juicing still has a place, particularly for those looking for a quick micronutrient boost or a digestive break, but it should be focused almost entirely on vegetables (cucumber, celery, kale) rather than high-sugar fruits like apples or pineapples.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Conclusion</h2>
        <p>
          Whether you choose to blend or juice, the key is mindfulness. Understand the sugar content of your ingredients and how they impact your satiety. By using the right tools to track your liquid nutrition, you can enjoy these vibrant drinks while staying firmly on the path to your fitness goals.
        </p>
        <div className="h-20"></div>
      </div>
    )
  },
  'post-workout-recovery': {
    title: "Post-Workout Recovery: The Golden Hour of Nutrition",
    date: "March 10, 2024",
    category: "Fitness",
    img: "https://picsum.photos/id/445/1200/600",
    content: (
      <div className="space-y-6">
        <p className="text-lg font-medium text-slate-700 leading-relaxed">
          You've finished your last set, wiped away the sweat, and walked out of the gym. But your workout isn't actually over. The recovery phase is where the real progress happens, and what you drink in the next 60 minutes can make or break your results.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Anabolic Window: Fact vs. Fiction</h2>
        <p>
          For years, bodybuilders have obsessed over the "anabolic window"—a supposed 30-minute period after exercise where your muscles are primed for growth. While modern science suggests this window is actually much wider (up to several hours), the principle remains: your body is most efficient at nutrient uptake immediately following intense physical stress.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Two Pillars of Recovery: Protein and Carbs</h2>
        <p>
          To recover effectively, your body needs two specific things:
        </p>
        <p>
          <strong>1. Protein for Repair:</strong> During exercise, you create microscopic tears in your muscle fibers. Protein provides the amino acids necessary to "patch" these tears, making the muscle stronger and larger than before.
        </p>
        <p>
          <strong>2. Carbohydrates for Refueling:</strong> Your muscles store energy in the form of glycogen. Intense exercise depletes these stores. If you don't replenish them with carbohydrates, your body may remain in a catabolic (muscle-wasting) state.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Finding the Perfect Ratio</h2>
        <p>
          Not all workouts require the same recovery drink. A heavy weightlifting session might require a 2:1 ratio of carbs to protein, while a long-distance run might require a 4:1 ratio to fully replenish glycogen. Using a <strong>Post-Workout Recovery Tool</strong> can help you dial in these numbers based on your specific intensity.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">The Role of Hydration in Recovery</h2>
        <p>
          Nutrient timing is useless if you're dehydrated. Water is the transport system that carries amino acids and glucose to your muscles. Furthermore, dehydration increases cortisol levels, which can inhibit muscle growth. Always pair your recovery shake with at least 16-20oz of water.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Conclusion</h2>
        <p>
          Don't let your hard work in the gym go to waste by neglecting your post-workout nutrition. By providing your body with the right balance of protein, carbohydrates, and hydration during the "golden hour," you'll reduce soreness, speed up progress, and be ready for your next session sooner.
        </p>
        <div className="h-20"></div>
      </div>
    )
  }
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? BLOG_POSTS[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-blue-600 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 pb-20"
    >
      {/* Article Header */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-slate-300 text-xs font-medium">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 prose prose-slate prose-blue max-w-none">
            {post.content}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">Try Our Tools</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Put this knowledge into action with our professional health calculators.
              </p>
              <Link to="/" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                Explore All Tools
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Share this Article</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
