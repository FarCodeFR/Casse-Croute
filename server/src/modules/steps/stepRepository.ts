import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { StepsToRecipe } from "./steps";
class stepRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM etape_preparation",
    );

    return rows as StepsToRecipe[];
  }

  async create(
    preparation: [{ ordre: number; description: string; recette_ref: number }],
  ) {
    // Type the input correctly
    let affectedRows = 0;

    for (const el of preparation) {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO etape_preparation (recette_id, ordre, description) VALUES (?, ?, ?)",
        [el.recette_ref, el.ordre, el.description], // Use steps.recette_ref
      );
      affectedRows += result.affectedRows;
    }

    return affectedRows;
  }
}
export default new stepRepository();
