import { useEffect, useState } from "react";
import ModifyProfile from "../../components/ModifyProfile";
import SeeProfile from "../../components/SeeProfile";
import "./ViewProfile.css";
import { toast } from "react-toastify";
import MyProfileRecipes from "../../components/MyProfilRecipes";
import type { userData } from "../../types/UserData";

function ViewProfile() {
  const [activeSection, setActiveSection] = useState("viewProfile");

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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }

        const data: userData = await response.json();
        setUser(data);
      } catch (err) {
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <main className="view-profile">
      <nav className="view-profile_nav">
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

      <section className="view-profile_content">
        {loading && <p>Chargement du profil...</p>}
        {error && toast.error("Un problème a été rencontré")}
        {user && activeSection === "viewProfile" && (
          <>
            <SeeProfile user={user} />
            <MyProfileRecipes />
          </>
        )}
        {user && activeSection === "modifyProfile" && (
          <ModifyProfile user={user} setUser={setUser} />
        )}
      </section>
    </main>
  );
}

export default ViewProfile;
