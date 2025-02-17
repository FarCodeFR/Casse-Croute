import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../pages/CreateRecipe/CreateRecipe.css";
// import { useParams } from "react-router-dom";
//interfaces to be put in a .d.ts, but still potentially going to change them, so hopefully can leave them here in the meantime.

export interface RecipeData {
  titre: string;
  recette_ref: number;
  image_url: string;
  description: string;
  temps_id: number;
  difficulte_id: number;
  type_id: number;
  preparation: { id: number | undefined; ordre: number; description: string }[];
  saison: string;
  utilisateur_id: number;
}

export interface Ingredient {
  nom: string;
  ingredientId: number;
  icone_categorie: string;
  unite: string;
}

export interface IngredientData {
  nom: string;
  id?: number;
  ingredientId: number;
  quantite: number;
  unite: string;
  icone_categorie: string;
  recette_ref: number;
  saison?: string;
}

export interface Preparation {
  id: number;
  ordre: number;
  description: string;
}

function ModifyRecipe() {
  const token = localStorage.getItem("jwtToken");
  //normally const recetteId = useParams();
  const recetteId = 1;
  const recipeIdNumber = Number(recetteId);
  console.warn(recetteId, recipeIdNumber);

  //declaration of states
  const [recipeData, setRecipeData] = useState<RecipeData>({
    titre: "",
    recette_ref: 0,
    image_url: "",
    description: "",
    temps_id: 1,
    difficulte_id: 1,
    type_id: 0,
    preparation: [{ id: undefined, ordre: 1, description: "" }],
    saison: "",
    utilisateur_id: 1,
  });
  // const navigate = useNavigate();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientData, setIngredientData] = useState<IngredientData[]>([]);
  const [letters, setLetters] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

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
  console.warn("recipeData", recipeData);
  console.warn("ingredientData", ingredientData);
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
      .then((data) => {
        const ingredientsWithId = data.map((ingredient: IngredientData) => ({
          ingredientId: ingredient.id, // Add ingredientId here
          nom: ingredient.nom,
          icone_categorie: ingredient.icone_categorie,
          unite: ingredient.unite,
        }));
        setIngredients(ingredientsWithId); // Update the state with the new array
      });

    const fetchRecipe = async () => {
      // setLoading(true);
      // setError(null);

      try {
        // need to render this dynamic and treat the use params id block above - awaiting integration into navigation to ensure we can apply the correct logic.
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/recette/${recipeIdNumber}`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `${response.status} ${response.statusText}: ${errorData?.message || "Failed to fetch recipe"}`,
          );
        }

        const data = await response.json();

        // Correctly handle the 'etapes' array:
        const initialPreparation =
          data.etapes && data.etapes.length > 0 // Check if etapes exists and is not empty
            ? data.etapes.map((etape: Preparation) => ({
                // Map over the etapes array
                id: etape.id,
                ordre: etape.ordre,
                description: etape.description,
              }))
            : [{ id: `${Date.now()}`, ordre: 1, description: "" }]; // Provide a default if no etapes

        setRecipeData({
          titre: data.titre,
          recette_ref: data.id,
          image_url: data.image_url,
          description: data.description,
          temps_id: data.temps_id || 1, // Provide default value if data.temps_id is null/undefined
          difficulte_id: data.difficulte || 1, // Provide default value if data.difficulte is null/undefined
          type_id: data.type_id || 0, // Provide default value if data.type_id is null/undefined
          preparation: initialPreparation,
          saison: data.saison,
          utilisateur_id: data.utilisateur_id || 1, // Provide default value if data.utilisateur_id is null/undefined
        });

        // Ensure ingredients are in the correct format:
        const initialIngredients = data.ingredients
          ? data.ingredients.map((ingredient: IngredientData) => ({
              nom: ingredient.nom,
              ingredientId: ingredient.id,
              quantite: ingredient.quantite || 1, // Default quantity if not provided
              unite: ingredient.unite || "00 g", // Default unit if not provided
              icone_categorie: ingredient.icone_categorie,
              recette_ref: data.id, // Use data.id here
            }))
          : [];
        setIngredientData(initialIngredients);
      } catch (error) {
        console.error("Error fetching recipe:");
        // setError(error.message);
        toast.error("Error fetching recipe. Please try again later.");
      } finally {
        // setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeIdNumber]);

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
          id: undefined,
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
        `${import.meta.env.VITE_API_URL}/api/recette/${recipeIdNumber}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        },
      );

      if (recipeResponse.ok) {
        // Start of the if block
        toast.success("Recette modifiée ! 👨‍🍳");

        const updatedIngredientData = ingredientData.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          quantite: ingredient.quantite,
          unite: ingredient.unite,
          nom: ingredient.nom,
          icone_categorie: ingredient.icone_categorie,
          recette_ref: ingredient.recette_ref,
        }));

        const ingredientsToSend = {
          recipeId: recipeIdNumber, // Use recipeIdNumber
          ingredients: updatedIngredientData,
        };

        const updatedPreparation = recipeData.preparation.map((step) => ({
          ...step,
          recette_ref: recipeData.recette_ref, // Or remove if not needed on backend
        }));
        setIngredientData(updatedIngredientData);
        setRecipeData((prevRecipeData) => ({
          ...prevRecipeData,
          preparation: updatedPreparation,
        }));
        const ingredientResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ingredientsAdded`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredientsToSend),
          },
        );

        if (ingredientResponse.ok) {
          toast.success("Ingredients modifiés ! 🍲");
          try {
            const stepResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/stepsAdded/${recipeIdNumber}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPreparation),
              },
            );
            if (stepResponse.ok) {
              toast.success("Etapes de préparation modifiées ! 🥦🔪");
            } else {
              toast.error("pas reussi");
            }
          } catch {
            toast.error("Erreur ajout etapes de preparation");
          }
        } else {
          const ingredientErrorText = await ingredientResponse.text();
          console.error(
            `Erreur ajout ingrédients:
            ${ingredientErrorText}`,
          );
          toast.error(
            "Erreur lors de l'ajout des ingrédients. Vérifiez les données.",
          );
        }
        // } catch (ingredientError) {
        //   console.error("Fetch error (ingrédients):", ingredientError);
        //   toast.error("Erreur lors de l'ajout des ingrédients.");
        // }
      } // End of the if (recipeResponse.ok) block  <--- This was missing
      else if (recipeResponse.status === 409) {
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
      console.error(`Fetch error (global): ${error}`);
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
          id="title"
          name="titre"
          value={recipeData.titre}
          onChange={handleInputRecipe}
          className="generic-input"
        />
        <label htmlFor="description">Description:</label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={recipeData.description}
          onChange={handleInputRecipe}
          className="generic-input"
        />
        <label htmlFor="time">Temps: {recipeData.temps_id} minutes</label>
        <input
          type="range"
          id="time"
          name="temps_id"
          value={recipeData.temps_id}
          onChange={handleInputRecipe}
        />
        <label htmlFor="difficulty">Difficulté:</label>
        <select
          required
          id="difficulty"
          name="difficulte_id"
          value={recipeData.difficulte_id}
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
          value={recipeData.saison}
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
          value={recipeData.type_id}
          onChange={handleInputRecipe}
          className="generic-input"
        >
          <option value="plat">plat principal</option>
          <option value="entree">entrée</option>
          <option value="dessert">dessert</option>
          <option value="boisson">boisson</option>
        </select>
        <label htmlFor="ingredients">Ingredients:</label>
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
            placeholder="Cherchez un ingredient..."
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
              name={`preparation[${index}].description`}
              value={step.description}
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

export default ModifyRecipe;
