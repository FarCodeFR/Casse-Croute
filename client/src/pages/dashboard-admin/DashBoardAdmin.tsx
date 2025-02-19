import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
import "./dashboard-user.css";
function DashboardAdmin() {
  return (
    <>
      <nav className="container-user-recipes">
        <section>
          <NavLink
            to="dashboard-user"
            className={({ isActive }) =>
              isActive ? "active-background-admin" : "inactive-background-admin"
            }
          >
            Utilisateur
          </NavLink>
          <NavLink
            to="dashboard-recipes"
            className={({ isActive }) =>
              isActive ? "active-background-admin" : "inactive-background-admin"
            }
          >
            Recette
          </NavLink>
        </section>
      </nav>
      <Outlet />
    </>
  );
}

export default DashboardAdmin;
