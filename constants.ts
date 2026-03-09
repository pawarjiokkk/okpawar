
import { Tool } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'daily-water',
    name: 'Daily Water Intake Calculator',
    description: 'Determine exactly how much water you need daily based on weight and activity levels.',
    icon: 'fa-droplet',
    path: '/water-intake',
    category: 'hydration'
  },
  {
    id: 'weight-hydration',
    name: 'Body Weight Hydration Tool',
    description: 'Specific hydration metrics focused strictly on your body mass index and weight class.',
    icon: 'fa-weight-scale',
    path: '/weight-hydration',
    category: 'hydration'
  },
  {
    id: 'smoothie-calories',
    name: 'Smoothie Calories Calculator',
    description: 'Track the nutritional value of your custom smoothie recipes with ease.',
    icon: 'fa-blender',
    path: '/smoothie-calculator',
    category: 'smoothie'
  },
  {
    id: 'juice-sugar',
    name: 'Juice Sugar Calculator',
    description: 'Estimate the natural sugar content in your favorite fresh-pressed juices.',
    icon: 'fa-glass-water',
    path: '/juice-sugar',
    category: 'smoothie'
  },
  {
    id: 'detox-planner',
    name: 'Detox Drink Planner',
    description: 'Plan your weekly detox schedule with personalized liquid recipes.',
    icon: 'fa-leaf',
    path: '/detox-planner',
    category: 'detox'
  },
  {
    id: 'protein-shake',
    name: 'Protein Shake Calculator',
    description: 'Calculate the optimal protein amount for your post-workout recovery shakes.',
    icon: 'fa-dumbbell',
    path: '/protein-calculator',
    category: 'fitness'
  },
  {
    id: 'bmi-calc',
    name: 'Body Mass Index (BMI) Calc',
    description: 'Quickly find your BMI and see how it impacts your hydration needs.',
    icon: 'fa-heart-pulse',
    path: '/bmi-calculator',
    category: 'fitness'
  },
  {
    id: 'fat-burn-drink',
    name: 'Fat Burn Drink Suggestion',
    description: 'Get recommendations for metabolic-boosting drinks based on your goals.',
    icon: 'fa-fire',
    path: '/fat-burn-suggestion',
    category: 'fitness'
  },
  {
    id: 'post-workout',
    name: 'Post-Workout Drink Tool',
    description: 'The perfect carbohydrate-to-protein ratio for your recovery needs.',
    icon: 'fa-person-running',
    path: '/post-workout-drink',
    category: 'fitness'
  },
  {
    id: 'immunity-boost',
    name: 'Immunity Boost Drink Tool',
    description: 'Vitamin-rich drink suggestions to strengthen your immune system.',
    icon: 'fa-shield-virus',
    path: '/immunity-boost',
    category: 'detox'
  }
];

export const CATEGORIES = [
  { id: 'hydration', name: 'Water & Hydration', icon: 'fa-faucet-drip', color: 'bg-blue-500' },
  { id: 'smoothie', name: 'Smoothie & Juice', icon: 'fa-carrot', color: 'bg-orange-500' },
  { id: 'detox', name: 'Detox & Wellness', icon: 'fa-seedling', color: 'bg-green-500' },
  { id: 'fitness', name: 'Fitness Drinks', icon: 'fa-bolt', color: 'bg-indigo-500' }
];
