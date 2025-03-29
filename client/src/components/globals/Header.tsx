import "../../styles/Header.css";
import "../../styles/Global.css";
import { NavLink } from "react-router-dom";
import useAuth from "../../pages/context/useAuth";
import SearchBar from "../SearchFilter";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  const { isLogged, user } = useAuth();

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
                  user?.est_admin === 1
                    ? "isLogged-header-admin"
                    : "isLogged-header-true"
                }
                to={
                  user?.est_admin === 1 ? "/dashboard-admin" : "/view-profile"
                }
              >
                <img
                  src={
                    user?.est_admin === 1
                      ? "/assets/images/admin.png"
                      : user
                        ? user.photo_profil
                        : "/assets/images/profil-images/profil.png"
                  }
                  alt={
                    user?.est_admin === 1
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
