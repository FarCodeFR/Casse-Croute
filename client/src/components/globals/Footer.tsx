import "../../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <ul className="footer-menu left-menu">
          <li>
            <Link to="/cgu">Conditions Générales d'Utilisation</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/cookies">
              Vos choix concernant l'utilisation des cookies
            </Link>
          </li>
        </ul>

        <div className="footer-center">
          <Link to="/">
            <img
              className="logo-footer"
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>

        <ul className="footer-menu right-menu">
          <li>
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link to="/recrutement">Recrutement</Link>
          </li>
        </ul>
      </div>
      <div className="footer-copyright">
        <p>Contacte-nous 👋 par Discord Gratuit</p>
        <p>© 2024 Casse Croûte. Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;
