
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: 'hydration' | 'smoothie' | 'detox' | 'fitness';
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CalculationResult {
  value: string | number;
  unit?: string;
  interpretation?: string;
  tips?: string[];
}
