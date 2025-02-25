import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../pages/context/useAuth";
import type { LoginFormProps, loginDataTypes } from "../types/LoginData";

export function LoginForm({ toggleForm }: LoginFormProps) {
  // Récupérer isLogged, isAdmin et setIsLogged, setIsAdmin depuis le contexte
  const { setIsLogged, setIsAdmin } = useAuth();
  const navigate = useNavigate();

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
      toast.error("Veuillez entrer votre nom d'utilisateur");
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
        localStorage.setItem("isAdmin", data.isAdmin);

        toast.success("Connexion réussie !");
        setIsLogged(true);
        setIsAdmin(data.isAdmin);
        navigate(data.isAdmin ? "/dashboard-admin" : "/view-profile");
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
    <form className="container-form-auth" onSubmit={handleSubmit}>
      <h1>Heureux de vous revoir !</h1>
      <section>
        <label aria-label="Mail" htmlFor="email">
          Email:
        </label>
        <input
          name="email"
          placeholder="thomas-42@email.fr"
          onChange={handleInputLogin}
          aria-label="Mail"
          required
        />
        <label aria-label="Mot de passe" htmlFor="password">
          Mot de passe:
        </label>
        <input
          name="password"
          type="password"
          placeholder="***********"
          onChange={handleInputLogin}
          aria-label="mot de passe"
          required
        />
      </section>
      <section>
        <button type="submit" id="login" aria-label="Se connecter">
          Se connecter
        </button>
        <p>Ou</p>
        <button
          type="button"
          id="login"
          aria-label="Créer un compte"
          onClick={toggleForm}
        >
          Créer un compte
        </button>
      </section>
    </form>
  );
}

export default LoginForm;
