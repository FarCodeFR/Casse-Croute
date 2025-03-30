import VerticalRecipeCard from "./VerticalRecipeCard";
import "../styles/latest-arrival.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { RecipeII } from "../types/RecipeValues";

function LatestArrival() {
  const [recette, setRecette] = useState([] as RecipeII[]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/date-recette`)
      .then((response) => response.json())
      .then((data: RecipeII[]) => {
        setRecette(data);
      });
  }, []);
  return (
    <>
      <section className="container-title-home">
        <h2>Dernier arrivage</h2>
      </section>
      <section className="container-recipes-latest-arrival">
        {recette.map((el) => {
          return (
            <NavLink key={el.id} to={`/recipe/${el.id}`}>
              <VerticalRecipeCard
                id={el.id}
                temps_preparation={el.temps_preparation}
                difficulte={el.difficulte}
                titre={el.titre}
                type_recette={el.type_recette}
                description={el.description}
                image_url={el.image_url}
              />
            </NavLink>
          );
        })}
      </section>
    </>
  );
}

export default LatestArrival;
