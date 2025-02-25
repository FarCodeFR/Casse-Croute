import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { LoginFormProps } from "../types/LoginData";
import type { userDataTypes } from "../types/UserData";

function CreateAccount({ toggleForm }: LoginFormProps) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<userDataTypes>({
    email: "",
    pseudo: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, pseudo, password, passwordConfirm } = userData;
    if (password !== passwordConfirm) {
      toast.error("Les mots de passe ne correspondent pas");
    } else if (!email || !pseudo || !password || !passwordConfirm) {
      toast.error("Veuillez remplir tous les champs");
    } else if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
      if (response.ok) {
        toast.success("Inscription réussie 👨‍🍳");
        navigate("/login");
      } else if (response.status === 409) {
        toast.error("Email déjà utilisé");
      } else {
        toast.error("Erreur lors de l'inscription 🤦‍♀️");
      }
    }
  }
  return (
    <form className="container-form-auth" onSubmit={handleSubmit}>
      <h1>Rejoignez la communauté Casse-croûte !</h1>
      <section>
        <label aria-label="Mail" htmlFor="email" className="login-label">
          Email:
        </label>
        <input
          type="email"
          aria-label="Mail"
          name="email"
          placeholder="thomas-42@email.fr"
          onChange={handleInputUserData}
        />
        <label
          aria-label="Identifiant"
          htmlFor="identifiant"
          className="login-label"
        >
          Identifiant:
        </label>
        <input
          type="text"
          aria-label="Identifiant"
          name="pseudo"
          placeholder="Lecuisinierdu49"
          required
          onChange={handleInputUserData}
        />

        <label
          aria-label="Mot de passe"
          htmlFor="password"
          className="login-label"
        >
          Mot de passe:
        </label>
        <input
          type="password"
          aria-label="Mot de passe"
          name="password"
          placeholder="***********"
          onChange={handleInputUserData}
        />

        <label
          aria-label="Confirme Mot de passe"
          htmlFor="passwordConfirm"
          className="login-label"
        >
          Confirmer le mot de passe:
          {userData.password === userData.passwordConfirm ? "✅" : "❌"}
        </label>
        <input
          type="password"
          aria-label="Confirme Mot de passe"
          name="passwordConfirm"
          placeholder="***********"
          onChange={handleInputUserData}
        />
      </section>
      <section className="legal-notices">
        <input
          aria-label="Mentiosn légales"
          type="checkbox"
          name="legal-notices"
          required
        />
        <label aria-label="Mentions légales" htmlFor="legal-notice">
          Veuillez cocher la case pour accepter&nbsp;
          <Link to="/legal-notices">les mentions légales.</Link>
        </label>
      </section>
      <section>
        <button type="submit" id="register" aria-label="Inscription">
          S'inscrire
        </button>
        <p>Ou</p>
        <button
          type="button"
          aria-label="Se connecter"
          className="registerHere"
          onClick={toggleForm}
        >
          Se connecter
        </button>
      </section>
    </form>
  );
}

export default CreateAccount;
