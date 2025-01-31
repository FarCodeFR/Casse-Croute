import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
function DashboardAdmin() {
  return (
    <>
      <nav className="container-user-recette">
        <section>
          <NavLink to="dashboard-user">Utilisateur</NavLink>
          <NavLink to="dashboard-recipes">Recette</NavLink>
        </section>
      </nav>
      <Outlet />
    </>
  );
}

export default DashboardAdmin;
