import "./ViewProfile.css";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./ViewProfile.css";
import { toast } from "react-toastify";
import type { userData } from "../../types/UserData";

function ViewProfile() {
  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé. Veuillez vous reconnecter.");
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
          toast.error("Erreur lors de la récupération du profil");
        }

        const data: userData = await response.json();
        setUser(data);
      } catch (err) {
        toast.error("Impossible de charger le profil.");
      } finally {
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <main className="view-profile">
      <nav>
        <section>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive
                ? "active-background-profile"
                : "inactive-background-profile"
            }
          >
            Profil
          </NavLink>
          <NavLink
            to="profile-modify"
            className={({ isActive }) =>
              isActive
                ? "active-background-modify"
                : "inactive-background-modify"
            }
          >
            Modification
          </NavLink>
        </section>
      </nav>
      <Outlet context={{ user, setUser }} />
    </main>
  );
}

export default ViewProfile;
