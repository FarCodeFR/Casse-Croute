import { useEffect, useState } from "react";
import "../styles/modify-profil.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import type { OutletContext } from "../types/UserData";
import PictureProfil from "./PictureProfil";

const ModifyProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext<OutletContext>();
  const [selectPicture, setSelectPicture] = useState(
    user.photo_profil || "/assets/images/profil-images/profil.png",
  );

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  // function

  const handleInputUserData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlePictureChange = (photo_profil: string) => {
    setSelectPicture(photo_profil);
  };

  // function to modify profil

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return toast.warn("Accès refusé : droits insuffisants.");
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/user/${user.id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo: user.pseudo,
        email: user.email,
        photo_profil: selectPicture,
      }),
    }).then((response) => {
      if (response.status === 204) {
        setUser((prevent) =>
          prevent
            ? {
                ...prevent,
                email: user.email,
                pseudo: user.pseudo,
                photo_profil: selectPicture,
              }
            : null,
        );
        toast.success("Profil mis à jour avec succès 🎉");
      } else if (response.status === 401) {
        toast.warn("Accès refusé");
      } else {
        toast.error("Erreur lors de la mise à jour du profil");
      }

      return navigate("/view-profile");
    });
  };
  return (
    <form
      className={`container-form-auth ${isVisible ? "visible" : ""}`}
      onSubmit={handleSubmit}
    >
      <PictureProfil
        pictureChange={handlePictureChange}
        selectPicture={selectPicture}
      />
      <section>
        <label aria-label="Email" htmlFor="email" className="login-label">
          Email
        </label>
        <input
          type="email"
          aria-label="Email"
          name="email"
          placeholder={user.email}
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
          placeholder={user.pseudo}
          onChange={handleInputUserData}
        />
        <section className="save-button">
          <button type="submit" aria-label="Sauvegarde">
            Sauvegarder
          </button>
        </section>
      </section>
    </form>
  );
};

export default ModifyProfile;
