export interface RecipeII {
  id: number;
  titre: string;
  temps_preparation: string;
  type_recette: string;
  difficulte: string;
  description: string;
  image_url: string;
}

export interface RecipeCardHorizontal {
  recette_id?: number;
  titre: string;
  image_url: string;
  description: string;
}

export interface RecipePropsId {
  recipeId: number;
}

export interface ingredientI {
  id: number;
  nom: string;
  icone_categorie: string;
}

export type RecipesScroll = {
  recipes: RecipeII[];
  setSelectRecipe: Dispatch<SetStateAction<boolean>>;
  searchRecipe: string;
};
