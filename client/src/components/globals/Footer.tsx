import "../../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <ul className="footer-menu">
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
            <li>
              <Link to="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link to="/recrutement">Recrutement</Link>
            </li>
          </ul>
        </div>
        <div className="footer-center">
          <nav className="footer-links">
            <li>
              <Link to="https://www.facebook.com/">
                <img
                  className="footer-icons facebook"
                  src="assets/images/facebook-icon.png"
                  alt="logo facebook"
                />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/">
                <img
                  className="footer-icons instagram"
                  src="assets/images/instagram-icon.png"
                  alt="logo instagram"
                />
              </Link>
            </li>
            <li>
              <Link to="https://x.com/">
                <img
                  className="footer-icons"
                  src="assets/images/x-icon.png"
                  alt="logo x"
                />
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/">
                <img
                  className="footer-icons"
                  src="assets/images/youtube-icon.png"
                  alt="logo youtube"
                />
              </Link>
            </li>
          </nav>
        </div>
        <div className="footer-right">
          <Link to="/">
            <img
              className="logo-footer"
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Contacte-nous 👋 par Discord Gratuit</p>
        <p>© 2024 Casse Croûte. Tous droits réservés</p>
        <p>
          Les photos utilisées sur ce site proviennent avec autorisation de
          Phubarb,
        </p>
        <p>
          sont l'exclusivité par nos Alliées en fortune. Merci à elles pour leur
          talent et
        </p>
        <p>leur générosité.</p>
      </div>
    </footer>
  );
}

export default Footer;
