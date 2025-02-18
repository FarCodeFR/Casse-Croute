import type { RecipesScroll } from "../types/RecipeValues";

function ScrollRecipes({
  searchRecipe,
  recipes,
  setSelectRecipe,
}: RecipesScroll) {
  return (
    <menu>
      <ul>
        {recipes
          .filter((val) => {
            if (
              searchRecipe === "" ||
              val.titre.toLowerCase().includes(searchRecipe.toLowerCase())
            )
              return val;
          })
          .map((el) => (
            <li key={el.id}>
              <button type="button" onClick={() => setSelectRecipe(el)}>
                {el.titre}
              </button>
            </li>
          ))}
      </ul>
    </menu>
  );
}

export default ScrollRecipes;
