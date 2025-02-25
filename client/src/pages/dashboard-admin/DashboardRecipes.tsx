import { useEffect, useState } from "react";
import ScrollRecipes from "../../components/ScrollRecipes";
import VerticalRecipeCard from "../../components/VerticalRecipeCard";
import type { RecipeI } from "../../types/RecipeValues";
import "./dashboard-recipes.css";
import { toast } from "react-toastify";
import Recipe from "../recipe/Recipe";

function DashboardRecipes() {
  const [recipes, setRecipes] = useState<RecipeI[]>([]);
  const [selectRecipe, setSelectRecipe] = useState<RecipeI | null>(null);
  const [searchRecipe, setSearchRecipe] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recettes`)
      .then((response) => response.json())
      .then((data: RecipeI[]) => {
        const filteredData = data.filter((recipe) => recipe.titre);
        setRecipes(filteredData);
      })
      .catch((err) => {
        toast.error(`Erreur lors de la récupération des recettes ${err}`);
      });
  }, []);

  return (
    <>
      <section className="container-dashboard-recipes">
        <label aria-label="Recette" htmlFor="Recherche">
          Recettes
        </label>
        <input
          type="text"
          aria-label="Recherche recette"
          name="name"
          placeholder="Recherche une recette"
          onChange={(event) => {
            setSearchRecipe(event.currentTarget.value);
          }}
        />
        <ScrollRecipes
          recipes={recipes}
          searchRecipe={searchRecipe}
          setSelectRecipe={setSelectRecipe}
        />
        {selectRecipe && (
          <VerticalRecipeCard
            id={selectRecipe.id}
            titre={selectRecipe.titre}
            temps_id={selectRecipe.temps_id}
            difficulte_id={selectRecipe.difficulte_id}
            type_id={selectRecipe.temps_id}
            description={selectRecipe.description}
            image_url={selectRecipe.image_url}
          />
        )}
      </section>
      <section className="container-bottom-recipe">
        <picture>
          {selectRecipe && (
            <section className="container-recette-admin">
              <Recipe recipeId={selectRecipe.id} />
            </section>
          )}
        </picture>
      </section>
    </>
  );
}

export default DashboardRecipes;
