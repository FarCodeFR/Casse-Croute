import "../../styles/Header.css";
import "../../styles/Global.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchFilter";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        <ul>
          <li>
            <HamburgerMenu />
          </li>
          <li>
            <Link to="/">
              <img
                className="logo-header"
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </li>
          <li className="bar2">
            <div className="search-container2">
              <SearchBar />
            </div>
          </li>

          <li>
            <Link to="/login" className="identify nav-button">
              S'identifier
            </Link>
          </li>
        </ul>
        <div className="search-container1 bar1">
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}

export default Header;
