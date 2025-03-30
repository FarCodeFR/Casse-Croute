import "./ViewProfile.css";
import { NavLink, Outlet } from "react-router-dom";
import "./ViewProfile.css";
import useAuth from "../context/useAuth";

function ViewProfile() {
  const { user, setUser } = useAuth();

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
