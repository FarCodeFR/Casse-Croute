import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { loginDataTypes } from "../../types/LoginData";
import useAuth from "../context/useAuth";
import "./form.css";

export function LoginForm() {
  const { setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPasswordVisible({
      ...passwordVisible,
      showPassword: !passwordVisible.showPassword,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const [loginData, setLoginData] = useState<loginDataTypes>({});

  const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginData;
    if (!email) {
      toast.error("Veuillez entrer votre email");
      return;
    }
    if (!password) {
      toast.error("Veuillez entrer votre mot de passe");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Erreur d'authentification";
        toast.error(errorMessage);
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        toast.success("Connexion réussie !");
        setIsLogged(true);
        setUser(data.isAdmin);
        navigate(data.isAdmin === 1 ? "/dashboard-admin" : "/view-profile");
      } else {
        toast.error(
          "Email ou mot de passe non-reconnu. Veuillez réessayer ou vous inscrire.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erreur de connexion. Veuillez réessayer plus tard.");
    }
  };

  return (
    <form
      className={`container-form-auth ${isVisible ? "visible" : ""}`}
      onSubmit={handleSubmit}
    >
      <h1>Heureux de vous revoir !</h1>
      <section>
        <label aria-label="email" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          name="email"
          placeholder="thomas-42@email.fr"
          onChange={handleInputLogin}
          aria-label="email"
          required
        />
        <label aria-label="mot de passe" htmlFor="password">
          Mot de passe:
        </label>
        <div className="password-container">
          <input
            id="password"
            name="password"
            type={passwordVisible.showPassword ? "text" : "password"}
            placeholder="***********"
            onChange={handleInputLogin}
            aria-label="mot de passe"
            required
          />
          <button
            className="show-password"
            type="button"
            onClick={handleClickShowPassword}
          >
            {passwordVisible.showPassword ? (
              <img
                src="assets/images/divers/visible.png"
                alt="mots de passe visible"
              />
            ) : (
              <img
                src="assets/images/divers/cacher.png"
                alt="mots de passe caché"
              />
            )}
          </button>
        </div>
      </section>
      <section>
        <button type="submit" aria-label="Se connecter">
          Se connecter
        </button>
        <p>Ou</p>
        <NavLink to="/register">
          <button type="button" aria-label="Créer un compte">
            Créer un compte
          </button>
        </NavLink>
      </section>
    </form>
  );
}

export default LoginForm;
