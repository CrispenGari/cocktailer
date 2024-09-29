export interface TIngredient {
  unit: string;
  amount: number;
  ingredient: string;
  label?: any;
  abv: number;
  taste?: any;
}

export interface TGlassIngredient {
  glass: string;
  ingredients: TIngredient[];
}

export interface TCocktail {
  iba: boolean;
  name: string;
  colors: string | string[];
  glass_and_ingredients: TGlassIngredient;
  category: string;
  garnish: string;
  preparation: string;
}
