export interface StepsToRecipe {
  recette_ref: string;
  preparation: [{ ordre: number; description: string }];
}

export interface StepsIntegral extends StepsToRecipe {
  preparation: [{ id: number; ordre: number; description: string }];
  recette_ref: string;
}

export interface straightSteps {
  id: number;
  ordre: number;
  description: string;
  recette_ref: number;
}
