import { useEffect, useState } from "react";
import ModifyProfile from "../../components/ModifyProfile";
import SeeProfile from "../../components/SeeProfile";
import "./ViewProfile.css";
import MyProfileRecipes from "../../components/MyProfilRecipes";
import type { userData } from "../../types/UserData";

function ViewProfile() {
  // Onglet actif : "viewProfile" | "modifyProfile" | "recipes"
  const [activeSection, setActiveSection] = useState("viewProfile");

  // Stockage des données utilisateur
  const [user, setUser] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Aucun token trouvé. Veuillez vous reconnecter.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3310/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }

        const data: userData = await response.json();
        setUser(data);
        console.info(data);
      } catch (err) {
        setError("Impossible de charger le profil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <main className="view-profile">
      <nav className="view-profile__nav">
        <button
          type="button"
          className={activeSection === "viewProfile" ? "active" : ""}
          onClick={() => setActiveSection("viewProfile")}
        >
          Profil
        </button>
        <button
          type="button"
          className={activeSection === "modifyProfile" ? "active" : ""}
          onClick={() => setActiveSection("modifyProfile")}
        >
          Éditer le profil
        </button>
        <button
          type="button"
          className={`recipes-btn ${activeSection === "recipes" ? "active" : ""}`}
          onClick={() => setActiveSection("recipes")}
        >
          Mes recettes
        </button>
      </nav>

      <section className="view-profile__content">
        {loading && <p>Chargement du profil...</p>}
        {error && <p>{error}</p>}
        {user && activeSection === "viewProfile" && <SeeProfile user={user} />}
        {user && activeSection === "modifyProfile" && (
          <ModifyProfile user={user} setUser={setUser} />
        )}
        {user?.id !== undefined && activeSection === "recipes" && (
          <MyProfileRecipes userId={user.id} />
        )}
      </section>
    </main>
  );
}

export default ViewProfile;
