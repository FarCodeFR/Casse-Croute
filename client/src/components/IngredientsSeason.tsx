import { useEffect, useState } from "react";
import "../styles/ingredients-season.css";
import type { ingredientI } from "../types/RecipeValues";

function IngredientsSeason() {
  const [ingredients, setIngredients] = useState([] as ingredientI[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredients-season`)
      .then((response) => response.json())
      .then((data: ingredientI[]) => {
        setIngredients(data);
      });
  }, []);
  return (
    <>
      <section className="container-titre-accueil">
        <h2>Vos ingrédients de saison</h2>
      </section>
      <section className="container-ingredients-season">
        <ul>
          {ingredients.map((el) => {
            return (
              <li key={el.id}>
                <figure>
                  <img src={el.icone_categorie} alt="" />
                  <figcaption>{el.nom}</figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default IngredientsSeason;
