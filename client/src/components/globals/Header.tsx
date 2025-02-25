import "../../styles/Header.css";
import "../../styles/Global.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../pages/context/useAuth";
import SearchBar from "../SearchFilter";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  const { isLogged, isAdmin } = useAuth();
  const [isAdminState, setIsAdminState] = useState(isAdmin);

  // Utilise useEffect pour mettre à jour isAdminState après la connexion
  useEffect(() => {
    setIsAdminState(isAdmin);
  }, [isAdmin]); // Se déclenche chaque fois que isAdmin change

  return (
    <header>
      <nav className="main-nav">
        <ul>
          <li>
            <HamburgerMenu />
          </li>
          <li>
            <NavLink to="/">
              <img
                className="logo-header"
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </NavLink>
          </li>
          <li>
            {isLogged ? (
              <NavLink
                className={
                  isAdminState === true
                    ? "isLogged-header-admin"
                    : "isLogged-header-true"
                }
                to={
                  isAdminState === true ? "/dashboard-admin" : "/view-profile"
                }
              >
                <img
                  src={
                    isAdminState === true
                      ? "/assets/images/admin.png"
                      : "/assets/images/profil.png"
                  }
                  alt={
                    isAdminState === true
                      ? "Profil Admin"
                      : "Profil utilisateur"
                  }
                />
              </NavLink>
            ) : (
              <NavLink to="/login" className="isLogged-header-false">
                S'identifier
              </NavLink>
            )}
          </li>
        </ul>
        <SearchBar />
      </nav>
    </header>
  );
}

export default Header;
