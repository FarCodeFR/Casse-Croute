export interface RecipeData {
  titre: string;
  recette_ref: string;
  image_url: string;
  description: string;
  temps_id: number;
  difficulte_id: number;
  type_id: number;
  preparation: { id: string; ordre: number; description: string }[];
  saison: string;
  utilisateur_id: number;
}

export interface Ingredient {
  nom: string;
  ingredientId: string;
  icone_categorie: string;
  unite: string;
}

export interface IngredientData extends Ingredient {
  quantite: number;
  recette_ref: string;
  id?;
}
