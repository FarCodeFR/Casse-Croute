import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type {
  IngredientToRecette,
  ingredientData,
} from "../ingredient/ingredient";
class IngToRecRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM ingredient_recette",
    );

    return rows as IngredientToRecette[];
  }

  async create(ingredient: IngredientToRecette) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO ingredient_recette (recette_id, ingredient_id, quantite, unite) VALUES (?, ?, ?, ?)",
      [
        ingredient.recette_ref,
        ingredient.ingredientId,
        ingredient.quantite,
        ingredient.unite,
      ],
    );
    return result.affectedRows;
  }

  async update(ingredient: ingredientData): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE ingredient_recette SET quantite = ?, unite = ? WHERE ingredient_id = ?",
      [
        ingredient.quantite,
        ingredient.unite,
        ingredient.ingredientId, // Use ingredientId (or ingredient_id)
      ],
    );
    return result.affectedRows;
  }

  async readByRecipeId(recipeId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from ingredient_recette where recette_id = ?",
      [recipeId],
    );
    return rows;
  }

  async delete(ingId: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from ingredient_recette where ingredient_id = ?",
      [ingId],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new IngToRecRepository();
