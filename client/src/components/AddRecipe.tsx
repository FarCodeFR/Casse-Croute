import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../pages/CreateRecipe/CreateRecipe.css";
//interfaces to be put in a .d.ts, but still potentially going to change them, so hopefully can leave them here in the meantime.
import type {
  Ingredient,
  IngredientData,
  RecipeData,
} from "../types/AddRecipe";

function AddRecipe() {
  const token = localStorage.getItem("jwtToken");
  //declaration of states
  const [recipeData, setRecipeData] = useState<RecipeData>({
    titre: "",
    recette_ref: 0,
    image_url: "",
    description: "",
    temps_id: 1,
    difficulte_id: 1,
    type_id: 0,
    preparation: [{ id: `${Date.now()}`, ordre: 1, description: "" }],
    saison: "",
    utilisateur_id: 0,
  });
  // const navigate = useNavigate();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientData, setIngredientData] = useState<IngredientData[]>([]);
  const [letters, setLetters] = useState("");

  const handleInputRecipe = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleInputIngredients = (ingredient: Ingredient) => {
    const foundIngredientInData = ingredientData.find(
      (existingIngredient) => existingIngredient.nom === ingredient.nom,
    );

    if (foundIngredientInData) {
      setIngredientData((prevIngredientData) =>
        prevIngredientData.map((existingIngredient) =>
          existingIngredient.nom === ingredient.nom
            ? {
                ...existingIngredient,
                quantite: existingIngredient.quantite + 1,
              }
            : existingIngredient,
        ),
      );
    } else {
      setIngredientData([
        ...ingredientData,
        {
          ...ingredient,
          quantite: 1,
          unite: "00 g",
          recette_ref: recipeData.recette_ref,
        },
      ]);
    }
  };

  const handleInputUnits = (
    e: React.ChangeEvent<HTMLSelectElement>,
    ingredientName: string,
  ) => {
    const unite = e.target.value;

    setIngredientData((prevIngredientData) =>
      prevIngredientData.map((ingredient) =>
        ingredient.nom === ingredientName
          ? { ...ingredient, unite }
          : ingredient,
      ),
    );
  };

  // Filter for ingredients
  const filteredIngredients =
    letters !== ""
      ? ingredients.filter((el) => el.nom.toLowerCase().includes(letters))
      : ingredients;
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setLetters(e.target.value.toLowerCase());
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredient`)
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, []);

  const handlePlus = (ingredientName: string) => {
    setIngredientData((prevIngredientData) =>
      prevIngredientData.map((ingredient) =>
        ingredient.nom === ingredientName
          ? { ...ingredient, quantite: ingredient.quantite + 1 }
          : ingredient,
      ),
    );
  };

  const handleMinus = (ingredientName: string) => {
    setIngredientData((prevIngredientData) =>
      prevIngredientData.map((ingredient) =>
        ingredient.nom === ingredientName && ingredient.quantite > 1
          ? { ...ingredient, quantite: ingredient.quantite - 1 }
          : ingredient,
      ),
    );
  };

  const handleDelete = (ingredientName: string) => {
    setIngredientData((prevIngredientData) =>
      prevIngredientData.filter(
        (ingredient) => ingredient.nom !== ingredientName,
      ),
    );
  };

  const handleSteps = () => {
    setRecipeData((prevRecipeData) => ({
      ...prevRecipeData,
      preparation: [
        ...prevRecipeData.preparation,
        {
          id: `${Date.now()}`,
          ordre: prevRecipeData.preparation.length + 1,
          description: "",
        },
      ],
    }));
  };

  const handleStepDelete = (index: number) => {
    setRecipeData((prevRecipeData) => {
      const updatedPreparation = prevRecipeData.preparation.filter(
        (_, i) => i !== index,
      );
      const reorderedPreparation = updatedPreparation.map((step, i) => ({
        ...step,
        ordre: i + 1,
      }));
      return { ...prevRecipeData, preparation: reorderedPreparation };
    });
  };

  const handleStepDescriptionChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    setRecipeData((prevRecipeData) => {
      // Create a *new* array for preparation
      const updatedPreparation = prevRecipeData.preparation.map((step, i) => {
        if (i === index) {
          // Correctly target the step to update
          return { ...step, description: value }; // Update the description
        }
        return step; // Keep other steps unchanged
      });

      return { ...prevRecipeData, preparation: updatedPreparation };
    });
  };

  //submit the form
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const {
      titre,
      description,
      temps_id,
      difficulte_id,
      type_id,
      preparation,
    } = recipeData;
    if (
      !titre ||
      !description ||
      !temps_id ||
      !difficulte_id ||
      !type_id ||
      !preparation
    ) {
      toast.error("Veuillez remplir tous les champs 🤦‍♀️");
      return;
    }
    try {
      const recipeResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/recette`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        },
      );

      if (recipeResponse.ok) {
        // Start of the if block
        toast.success("Recette crée ! 👨‍🍳");
        const recipeDataFromServer = await recipeResponse.json();

        const updatedIngredientData = ingredientData.map((ingredient) => ({
          ...ingredient,
          recette_ref: recipeDataFromServer,
          ingredientId: ingredient.id,
        }));

        const updatedPreparation = recipeData.preparation.map((step) => ({
          ...step,
          recette_ref: recipeDataFromServer, // Or remove if not needed on backend
        }));
        setIngredientData(updatedIngredientData);
        setRecipeData((prevRecipeData) => ({
          ...prevRecipeData,
          preparation: updatedPreparation,
        }));

        const ingredientResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ingredientsAdded`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedIngredientData),
          },
        );

        if (ingredientResponse.ok) {
          toast.success("Ingredients ajouté ! 🍲");
          try {
            const stepResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/stepsAdded`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPreparation),
              },
            );
            if (stepResponse.ok) {
              toast.success("Etapes de préparation ajoutées ! 🥦🔪");
            } else {
              toast.error("pas reussi");
            }
          } catch {
            toast.error("Erreur ajout etapes de preparation");
          }
        } else {
          const ingredientErrorText = await ingredientResponse.text();
          toast.error(
            `Erreur ajout ingrédients:
            ${ingredientErrorText}`,
          );
          toast.error(
            "Erreur lors de l'ajout des ingrédients. Vérifiez les données.",
          );
        }
      } else if (recipeResponse.status === 409) {
        const errorText = await recipeResponse.text();
        toast.error(
          `Erreur création recette:
          ${recipeResponse.status},
          ${errorText}`,
        );
        toast.error("Erreur lors de la création de la recette.");
      }
    } catch (error) {
      toast.error(`Fetch error (global): ${error}`);
      toast.error("Une erreur s'est produite lors de la requête.");
    }
  }

  //DISPLAY THE FORM

  return (
    <main className="add-recipe-main">
      <form onSubmit={handleSubmit} className="create-recipe-form">
        <label htmlFor="titre">Titre:</label>
        <input
          required
          type="text"
          aria-label="Titre"
          name="titre"
          onChange={handleInputRecipe}
          className="generic-input"
        />
        <label htmlFor="description">Description:</label>
        <input
          required
          type="text"
          aria-label="Description"
          name="description"
          onChange={handleInputRecipe}
          className="generic-input"
        />
        <label htmlFor="time">Temps: {recipeData.temps_id} minutes</label>
        <input
          type="range"
          id="time"
          name="temps_id"
          onChange={handleInputRecipe}
        />
        <label htmlFor="difficulty">Difficulté:</label>
        <select
          required
          id="difficulty"
          name="difficulte_id"
          onChange={handleInputRecipe}
          className="generic-input"
        >
          <option value="1">debutant</option>
          <option value="2">habitué</option>
          <option value="3">top chef</option>
        </select>

        {/* Select season */}
        <label htmlFor="saison">Saison:</label>
        <select
          required
          id="saison"
          name="saison"
          onChange={handleInputRecipe}
          className="generic-input"
        >
          <option value="hiver">hiver</option>
          <option value="printemps">printemps</option>
          <option value="été">été</option>
          <option value="automne">automne</option>
          <option value="toutes saisons"> toutes saison</option>
        </select>

        <label htmlFor="type">Type de plat:</label>
        <select
          required
          id="type"
          name="type_id"
          onChange={handleInputRecipe}
          className="generic-input"
        >
          <option value="1">plat principal</option>
          <option value="2">entrée</option>
          <option value="3">dessert</option>
          <option value="4">boisson</option>
        </select>
        <label aria-label="Ingredients" htmlFor="ingredients">
          Ingredients:
        </label>
        <section className="container-ingredients-season">
          {ingredientData.map((ingredient) => (
            <div key={ingredient.ingredientId}>
              <input
                type="button"
                name={ingredient.nom}
                aria-label="delete"
                className="delete-button"
                onClick={() => handleDelete(ingredient.nom)}
                value="X"
              />
              <figure>
                <img src={ingredient.icone_categorie} alt={ingredient.nom} />
                <figcaption>
                  {ingredient.quantite}
                  <select
                    name={ingredient.nom}
                    onChange={(e) => handleInputUnits(e, ingredient.nom)} // Pass ingredient name
                    value={ingredient.unite}
                    className="unit-selector"
                  >
                    <option value="g">g</option>
                    <option value="00 g">00 g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="cl">cl</option>
                    <option value="l">l</option>
                  </select>{" "}
                  {ingredient.nom}
                </figcaption>
              </figure>
              <section>
                <input
                  type="button"
                  aria-label="minus"
                  className="minus-button"
                  onClick={() => handleMinus(ingredient.nom)} // Pass ingredient name
                  value="-"
                />
                <input
                  type="button"
                  aria-label="add"
                  className="add-button"
                  onClick={() => handlePlus(ingredient.nom)} // Pass ingredient name
                  value="+"
                />
              </section>
            </div>
          ))}
        </section>

        <section className="container-ingredients-season filter-ingredients">
          <input
            type="text"
            aria-label="Recherche ingredients"
            placeholder="Allez chercher..."
            onChange={handleSearch}
          />
          <ul>
            {filteredIngredients.map((ingredient) => (
              <div key={ingredient.ingredientId}>
                <input
                  type="button"
                  onClick={() => handleInputIngredients(ingredient)}
                  value="+"
                  className="add-button"
                />
                <label htmlFor={ingredient.nom}>
                  <img
                    src={ingredient.icone_categorie}
                    alt={`${ingredient.nom} icon`}
                  />
                  {ingredient.nom}
                </label>
              </div>
            ))}
          </ul>
        </section>

        <label htmlFor="instructions">Instructions:</label>
        {recipeData.preparation.map((step, index) => (
          <div key={step.id}>
            <textarea
              id={`instructions-${index}`}
              aria-label="Description"
              name={`preparation[${index}].description`} // This name is important for form submission
              value={step.description} // Controlled component: value from state
              onChange={(event) => handleStepDescriptionChange(index, event)}
            />
            <button
              type="button"
              aria-label="remove step"
              className="delete-button"
              onClick={() => handleStepDelete(index)}
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          id="addStep"
          aria-label="add step"
          className="add-button"
          onClick={handleSteps}
        >
          +
        </button>
        <button
          type="submit"
          id="submit"
          aria-label="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default AddRecipe;
