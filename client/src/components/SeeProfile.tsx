import type { userData } from "../types/UserData";
import "../styles/see-user.css";

function SeeProfile({ user }: { user: userData }) {
  return (
    <section className="profile-container">
      <article className="profile">
        <figure>
          <img
            src={user.photo_profil || "/assets/images/profil.png"}
            alt="Avatar de profil"
          />

          <figcaption>
            <h2>{user.pseudo || user.email}</h2>
          </figcaption>
        </figure>

        <div className="profile-message">
          <div className="message-line" />
          <p>Petit message</p>
          <div className="message-line" />
        </div>

        <p className="profile-description">
          {user.message ||
            "Je suis passionné de cuisine et j’aime partager mes recettes et découvrir de nouvelles spécialités."}
        </p>
      </article>
    </section>
  );
}

export default SeeProfile;
