import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../pages/context/useAuth";
import type { LoginFormProps, loginDataTypes } from "../types/LoginData";

export function LoginForm({ toggleForm }: LoginFormProps) {
  const { setIsLogged, setIsAdmin } = useAuth();
  const [loginData, setLoginData] = useState<loginDataTypes>({});

  const navigate = useNavigate();

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
      // Simplified check
      toast.error("Veuillez entrer votre nom d'utilisateur");
      return; // Stop further execution
    }
    if (!password) {
      // Simplified check
      toast.error("Veuillez entrer votre mot de passe");
      return; // Stop further execution
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
        const errorData = await response.json(); // Try to get error details from the server
        const errorMessage = errorData.message || "Erreur d'authentification"; // Use server message or default
        toast.error(errorMessage);
        return; // Stop here if there's an error
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        toast.success("Connexion réussie !");
        setIsLogged(true);
        setIsAdmin(!!data.isAdmin);
        navigate("/");
      } else {
        toast.error(
          "Email ou mot de passe non-reconnu. Veuillez reessayer ou vous inscrire.",
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
