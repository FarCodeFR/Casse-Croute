import "../styles/horizontal-card.css";
import type { RecipeCardHorizontal } from "../types/RecipeValues";
function HorizontalRecipeCard({
  titre,
  description,
  image_url,
}: RecipeCardHorizontal) {
  return (
    <section className="horizontal-card">
      <picture>
        <img src={image_url} alt={titre} />
      </picture>
      <article>
        <h2>{titre}</h2>
        <p>{description}</p>
      </article>
    </section>
  );
}
export default HorizontalRecipeCard;
