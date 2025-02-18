export interface Ingredient {
  ingredientId?: number;
  nom: string;
  categorie: string;
  saison: string;
  icone_categorie: string;
  id?: number;
}
export interface IngredientToRecette {
  recette_ref: string;
  ingredientId: number;
  quantite: number;
  unite: string;
}
export interface ingredientData extends Ingredient {
  recette_ref: string;
  quantite: number;
  unite: string;
}
