import "../../styles/Header.css";
import "../../styles/Global.css";
// import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../pages/context/useAuth";
import SearchBar from "../SearchFilter";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  const { isLogged, isAdmin } = useAuth();

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
                  isAdmin === 1
                    ? "isLogged-header-admin"
                    : "isLogged-header-true"
                }
                to={isAdmin === 1 ? "/dashboard-admin" : "/view-profile"}
              >
                <img
                  src={
                    isAdmin === 1
                      ? "/assets/images/admin.png"
                      : "/assets/images/profil.png"
                  }
                  alt={isAdmin === 1 ? "Profil Admin" : "Profil utilisateur"}
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
