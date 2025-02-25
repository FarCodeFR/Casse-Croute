import { NavLink } from "react-router-dom";
import "../../styles/not-found.css";

function NotFound() {
  return (
    <section className="container-not-found">
      <picture>
        <img
          src="assets/images/not-found.png"
          alt="Représentation d'un monsieur cookie qui boit son café"
        />
      </picture>
      <article>
        <h1>Ooooops...</h1>
        <h2>Cette page est introuvable.</h2>
        <NavLink to="/">Retournez sur la page d'accueil...</NavLink>
      </article>
    </section>
  );
}

export default NotFound;
