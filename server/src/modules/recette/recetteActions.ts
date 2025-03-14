import type { RequestHandler } from "express";
import recetteRepository from "./recetteRepository";

// Récupérer toutes les recettes
const browse: RequestHandler = async (req, res, next) => {
  try {
    const recipes = await recetteRepository.readAll();
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

const browseSeason: RequestHandler = async (req, res) => {
  try {
    const ingredient = await recetteRepository.seasonReadAll();
    res.json(ingredient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

const browseLatestArrival: RequestHandler = async (req, res, next) => {
  try {
    const recipes = await recetteRepository.lastReadFour();
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

const browsUserRecipes: RequestHandler = async (req, res, next) => {
  try {
    const userRecipes = await recetteRepository.userRecipes();
    if (!userRecipes) {
      res.status(404).send("Aucune recette trouvée.");
    } else {
      res.status(200).json(userRecipes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

// Récupérer une recette spécifique par ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number.parseInt(req.params.id, 10);
    const recipe = await recetteRepository.readById(recipeId);

    if (!recipe) {
      res.status(404).send("Recette non trouvée.");
    } else {
      const {
        tempsPreparationHeure,
        tempsPreparationMinute,
        commentaires,
        ...restOfRecipe
      } = recipe;

      // Vérifier si commentaires est null et le transformer en tableau vide si nécessaire
      const formattedCommentaires = commentaires
        ? JSON.parse(commentaires)
        : [];

      const formattedRecipe = {
        ...restOfRecipe,
        tempsPreparation: {
          heure: tempsPreparationHeure || 0,
          minute: tempsPreparationMinute || 0,
        },
        commentaires: formattedCommentaires,
      };

      res.status(200).json(formattedRecipe);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

// Ajouter une recette
const add: RequestHandler = async (req, res, next) => {
  const userId = res.locals.decodedToken.id; // Or req.user.id, or req.auth.userId, etc.
  const typeId = Number.parseInt(req.body.type_id, 10); // Use parseInt for integers

  try {
    const newRecipeId = await recetteRepository.create(
      req.body,
      userId,
      typeId,
    );

    if (newRecipeId) {
      res.status(201).json(newRecipeId);
    } else {
      res.status(400).send("Erreur lors de l'ajout de la recette.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

// Modifier une recette existante
const edit: RequestHandler = async (req, res, next) => {
  const typeId = Number.parseInt(req.body.type_id, 10); // Use parseInt for integers
  try {
    const recipeId = Number.parseInt(req.params.id);

    const updatedRecipe = await recetteRepository.update(
      {
        ...req.body,
        id: recipeId,
      },
      typeId,
    );

    if (updatedRecipe) {
      res.status(200).json({ message: "Recette mise à jour avec succès." });
    } else {
      res.status(404).send("Recette non trouvée.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

// Supprimer une recette
const del: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number.parseInt(req.params.id);
    const deleted = await recetteRepository.delete(recipeId);
    if (deleted) {
      res.status(200).send("Recette supprimée avec succès.");
    } else {
      res.status(404).send("Recette non trouvée.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur.");
  }
};

export default {
  browse,
  read,
  add,
  edit,
  del,
  browseLatestArrival,
  browseSeason,
  browsUserRecipes,
};
