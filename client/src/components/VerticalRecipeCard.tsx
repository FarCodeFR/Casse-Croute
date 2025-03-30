import "../styles/VerticalRecipeCard.css";
import type { RecipeII } from "../types/RecipeValues";

function VerticalRecipeCard({
  titre,
  temps_preparation,
  difficulte,
  type_recette,
  description,
  image_url,
}: RecipeII) {
  return (
    <article className="recipe-container">
      <div className="img-container">
        {image_url ? (
          <img className="circular-img" src={image_url} alt={titre} />
        ) : (
          <img src="assets/images/divers/default-image.png" alt="par default" />
        )}
      </div>
      <section className="text-container">
        <h1 className="title">{titre}</h1>
        {description ? (
          <p className="description">{description}</p>
        ) : (
          <p className="description">. . . . . . . . . .</p>
        )}

        <ul>
          <li>
            <div className="circle">
              <img
                className="time"
                src="/assets/images/icons-card/icon-horloge.png"
                alt="logo horloge"
              />
            </div>
            {temps_preparation ? <p>{temps_preparation}</p> : <p>10min</p>}
          </li>
          <li>
            <div className="circle">
              <img
                className="difficulty"
                src="/assets/images/icons-card/icon-difficult.png"
                alt="logo indiquant un niveau de difficulté"
              />{" "}
            </div>
            {difficulte ? <p>{difficulte}</p> : <p>Facile</p>}
          </li>
          <li>
            <div className="circle">
              {" "}
              <img
                className="type"
                src="/assets/images/icons-card/icon-chicken.png"
                alt="logo d'un poulet cuit"
              />
            </div>
            {type_recette ? <p>{type_recette}</p> : <p>Entrée</p>}
          </li>
        </ul>
      </section>
    </article>
  );
}

export default VerticalRecipeCard;
