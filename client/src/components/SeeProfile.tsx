import type { userData } from "../types/UserData";

function SeeProfile({ user }: { user: userData }) {
  return (
    <section className="profile-container">
      <div className="profile-header">
        <figure>
          <img
            src={user.photo_profil || "public/assets/images/profil.png"}
            alt="Avatar de profil"
            className="profile-avatar"
          />
          <figcaption>
            <h2>{user.pseudo || user.email}</h2>
          </figcaption>
        </figure>
      </div>

      <p className="profile-message-title">Petit message</p>
      <hr />
      <p className="profile-description">
        {/* ✅ Ajout d'un message par défaut */}
        {user.message ||
          "Je suis passionné de cuisine et j’aime partager mes recettes."}
      </p>
    </section>
  );
}

export default SeeProfile;
