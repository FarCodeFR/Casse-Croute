import VerticalRecipeCard from "./VerticalRecipeCard";
import "../styles/recipes-season.css";
import { useEffect, useState } from "react";
import type { RecipeI } from "../types/RecipeValues";

function RecipesSeason() {
  const [recette, setRecette] = useState([] as RecipeI[]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recette-saison`)
      .then((response) => response.json())
      .then((data: RecipeI[]) => {
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
            <NavLink key={el.id} to={`/api/recette/${el.id}`}>
              <li>
                <VerticalRecipeCard
                  titre={el.titre}
                  temps_id={el.temps_id}
                  difficulte_id={el.difficulte_id}
                  type_id={el.type_id}
                  description={el.description}
                  image_url={el.image_url}
                />
              </li>
            </NavLink>
          );
        })}
      </ul>
    </article>
  );
}

export default RecipesSeason;
