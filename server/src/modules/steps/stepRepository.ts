import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { StepsIntegral, StepsToRecipe, straightSteps } from "./steps";
class stepRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM etape_preparation",
    );

    return rows as StepsToRecipe[];
  }

  async create(
    steps: [{ ordre: number; description: string; recette_ref: number }],
  ): Promise<number | undefined> {
    // Type the input correctly

    for (const el of steps) {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO etape_preparation (recette_id, ordre, description) VALUES (?, ?, ?)",
        [el.recette_ref, el.ordre, el.description], // Use steps.recette_ref
      );
      return result.affectedRows;
    }
  }
  async update(steps: straightSteps): Promise<number> {
    // Use IngredientData

    // for (const step of steps.preparation) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE etape_preparation SET ordre = ?, description = ? WHERE id = ? AND recette_id = ?",
      [
        steps.ordre,
        steps.description,
        steps.id, // Use ingredientId (or ingredient_id)
        steps.recette_ref,
      ],
    );
    // }
    return result.affectedRows;
  }

  async modifCreate(steps: {
    ordre: number;
    description: string;
    recette_ref: number;
  }) {
    // Type the input correctly

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO etape_preparation (recette_id, ordre, description) VALUES (?, ?, ?)",
      [steps.recette_ref, steps.ordre, steps.description], // Use steps.recette_ref
    );

    return result.affectedRows;
  }

  async readByRecipeId(recipeId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from etape_preparation where recette_id = ?",
      [recipeId],
    );
    return rows;
  }

  async delete(stepId: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from etape_preparation where id = ?",
      [stepId],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}
export default new stepRepository();
