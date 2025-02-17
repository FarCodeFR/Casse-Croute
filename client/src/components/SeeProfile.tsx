import type { userData } from "../types/UserData";
import "../styles/see-user.css";

function SeeProfile({ user }: { user: userData }) {
  return (
    <section className="profile">
      <div>
        <img
          src={user.photo_profil || "/assets/images/profil.png"}
          alt="Avatar de profil"
        />
        <div>
          <h2>{user.pseudo || user.email}</h2>
        </div>
      </div>

      <div className="profile-message">
        <div className="message-line" />
        <p>Petit message</p>
        <div className="message-line" /> {/* ✅ Auto-fermante */}
      </div>

      <p className="profile-description">
        {user.message ||
          "Je suis passionné de cuisine et j’aime partager mes recettes et découvrir de nouvelles spécialités."}
      </p>
    </section>
  );
}

export default SeeProfile;
