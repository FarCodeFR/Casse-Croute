import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/HamburgerMenu.css";
import useAuth from "../../pages/context/useAuth";

function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const { setIsLogged, isLogged, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAdmin");
    setIsLogged(false);
    setIsAdmin(0);
    navigate("/");
  };

  return (
    <div className="menu-container">
      <Hamburger size={40} toggled={open} toggle={setOpen} />
      {open && (
        <div>
          <header>
            <Hamburger size={40} toggled={open} toggle={setOpen} />
          </header>
          <ul>
            <li>
              <NavLink to="/recipe-page">Catalogue</NavLink>
            </li>
            <li>
              {isLogged && <NavLink to="/create-recipe">Create Recipe</NavLink>}
            </li>
            <li>
              <NavLink to="/legal-notices">Mentions légales</NavLink>
            </li>
            <li>
              {isLogged && (
                <Link to="/" onClick={logout}>
                  Déconnexion
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
