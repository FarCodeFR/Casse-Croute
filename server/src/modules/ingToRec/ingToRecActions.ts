import type { RequestHandler } from "express";
import ingToRecRepository from "./ingToRecRepository";

const browse: RequestHandler = async (req, res) => {
  try {
    const IngredientToRecette = await ingToRecRepository.readAll();
    res.json(IngredientToRecette);
  } catch (err) {
    console.error(err);
  }
};

const add: RequestHandler = async (req, res) => {
  const ingredientsToAdd = req.body; // Get the array of ingredients
  try {
    let successCount = 0; // Track how many ingredients were successfully added

    for (const ingredient of ingredientsToAdd) {
      // Iterate through the array
      try {
        const addIngToRec = await ingToRecRepository.create(ingredient);
        if (addIngToRec) {
          successCount++;
        } else {
          console.error(`Failed to add ingredient: ${ingredient.ingredientId}`); // Log specific failures
        }
      } catch (err) {
        console.error(
          `Error adding ingredient ${ingredient.ingredientId}:`,
          err,
        );
        // Consider whether to break here or continue adding other ingredients
      }
    }

    if (successCount === ingredientsToAdd.length) {
      // All were added successfully
      res.status(201).send("All ingredients added successfully");
    } else if (successCount > 0) {
      res
        .status(200)
        .send(
          `${successCount} of ${ingredientsToAdd.length} ingredients added successfully.`,
        ); // Partial success
    } else {
      res.status(500).send("Failed to add any ingredients."); // None were added
    }
  } catch (err) {
    res.status(500).send("A global error occurred adding ingredients."); // More general error message
  }
};

const updateRecipeIngredients: RequestHandler = async (req, res) => {
  const { recipeId, ingredients } = req.body;
  try {
    const existingIngredients =
      await ingToRecRepository.readByRecipeId(recipeId);

    const newIngredients = [];
    const updatedIngredients = [];

    for (const ingredient of ingredients) {
      const existingIngredient = existingIngredients.find(
        (existing) => existing.ingredient_id === ingredient.ingredientId, // Correct comparison
      );

      if (existingIngredient) {
        updatedIngredients.push(ingredient);
      } else {
        newIngredients.push(ingredient);
      }
    }

    // Determine ingredients to delete
    for (const ing of existingIngredients) {
      const stillExists = ingredients.find(
        (s: { ingredientId: number }) => s.ingredientId === ing.ingredient_id,
      );
      if (!stillExists) {
        ingToRecRepository.delete(ing.ingredient_id);
      }
    }

    // Update existing ingredients
    for (const ingredient of updatedIngredients) {
      try {
        const updateResult = await ingToRecRepository.update(ingredient); // Pass the whole ingredient object
        if (updateResult === 0) {
          console.error(
            "No rows were updated for ingredient id:",
            ingredient.ingredientId,
          );
        }
      } catch (updateError) {
        console.error("Error updating ingredient:", updateError);
        // Handle error as needed
      }
    }

    // 4. Create new ingredients
    for (const ingredient of newIngredients) {
      try {
        await ingToRecRepository.create({ ...ingredient, recipeId });
      } catch (createError) {
        console.error("Error creating ingredient:", createError);
        // Handle error as needed
      }
    }

    res.status(200).send("Ingredients updated/created successfully");
  } catch (error) {
    console.error("Global error:", error);
    res.status(500).send("An error occurred.");
  }
};

export default { browse, add, updateRecipeIngredients };
