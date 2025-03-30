import VerticalRecipeCard from "./VerticalRecipeCard";
import "../styles/recipes-season.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { RecipeII } from "../types/RecipeValues";

function RecipesSeason() {
  const [recette, setRecette] = useState([] as RecipeII[]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recette-saison`)
      .then((response) => response.json())
      .then((data: RecipeII[]) => {
        setRecette(data);
      });
  }, []);
  return (
    <article className="container-recipes-season">
      <section>
        <h2>Vos Recettes de saison</h2>
      </section>
      <ul>
        {recette.map((el) => {
          return (
            <li key={el.id}>
              <NavLink to={`/recipe/${el.id}`}>
                <VerticalRecipeCard
                  id={el.id}
                  titre={el.titre}
                  temps_preparation={el.temps_preparation}
                  difficulte={el.difficulte}
                  type_recette={el.type_recette}
                  description={el.description}
                  image_url={el.image_url}
                />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default RecipesSeason;
