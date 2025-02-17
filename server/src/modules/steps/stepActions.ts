import type { RequestHandler } from "express";
import stepRepository from "./stepRepository";

const browse: RequestHandler = async (req, res) => {
  try {
    const recipeSteps = await stepRepository.readAll();
    res.json(recipeSteps);
  } catch (err) {
    console.error(err);
  }
};

const add: RequestHandler = async (req, res) => {
  const { preparation, recette_ref } = req.body;

  try {
    const addStepsResult = await stepRepository.create({
      preparation,
      recette_ref,
    });

    if (addStepsResult > 0) {
      // Check if ANY rows were inserted
      res.status(201).send(`${addStepsResult} step(s) added successfully`);
    } else {
      res.status(200).send("No steps were added (or perhaps some failed).");
    }
  } catch (err) {
    res.status(500).send("A global error occurred adding steps.");
  }
};

const updateSteps: RequestHandler = async (req, res) => {
  const steps = req.body;

  try {
    const existingSteps = await stepRepository.readByRecipeId(
      steps[0].recette_ref,
    );

    const newSteps = [];
    const updatedSteps = [];
    for (const step of steps) {
      const existingStep = existingSteps.find(
        (existing) => existing.id === step.id, // Correct comparison
      );

      if (existingStep) {
        updatedSteps.push(step);
      } else {
        newSteps.push(step);
      }
    }

    for (const step of existingSteps) {
      if (
        !updatedSteps.find((s) => s.id === step.id) &&
        !newSteps.find((s) => s.id === step.id)
      ) {
        // stepsToDelete.push(step)
        stepRepository.delete(step.id);
      }
    }

    // Update existing Steps
    for (const step of updatedSteps) {
      try {
        const updateResult = await stepRepository.update(step); // Pass the whole step object
        if (updateResult === 0) {
          console.warn("No rows were updated for step id:", step.step_id);
        }
      } catch (updateError) {
        console.error("Error updating step:", updateError);
        // Handle error as needed
      }
    }

    // 4. Create new Steps
    for (const step of newSteps) {
      try {
        await stepRepository.modifCreate(step); // Associate with recipeId
      } catch (createError) {
        console.error("Error creating step:", createError);
        // Handle error as needed
      }
    }

    res.status(200).send("Steps updated/created successfully"); // Or a more detailed response
  } catch (error) {
    console.error("Global error:", error);
    res.status(500).send("An error occurred.");
  }
};

export default { browse, add, updateSteps };
