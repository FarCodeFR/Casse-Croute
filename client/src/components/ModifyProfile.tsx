import { useState } from "react";
import type { userDataTypes } from "../types/UserData";
import "../styles/modify-profil.css";

function ModifyProfile() {
  const forbiddenCharacters = /[^a-zA-Z0-9]/g;
  const [userData, setUserData] = useState<userDataTypes>({
    email: "",
    pseudo: "",
    personalMessage: "",
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value.replace(forbiddenCharacters, ""),
    });
  };

  return (
    <form className="profile-form">
      <div className="avatar-container">
        <img className="avatar" src="/assets/images/avatar.png" alt="Avatar" />
        <button type="button" className="edit-avatar">
          <img src="/assets/images/editIcon.png" alt="Edit avatar" />
        </button>
      </div>

      <label>
        Email
        <div className="input-container">
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/editIcon.png" alt="Edit email" />
        </div>
      </label>

      <label>
        Pseudo
        <div className="input-container">
          <input
            type="text"
            name="pseudo"
            value={userData.pseudo}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/editIcon.png" alt="Edit pseudo" />
        </div>
      </label>

      <label>
        Phrase perso
        <div className="input-container">
          <input
            type="text"
            name="personalMessage"
            value={userData.personalMessage}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/editIcon.png" alt="Edit personal message" />
        </div>
      </label>

      <label>
        Mot de passe actuel
        <div className="input-container">
          <input
            type="password"
            name="currentPassword"
            value={userData.currentPassword}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/editIcon.png" alt="Edit password" />
        </div>
      </label>

      <label>
        Nouveau mot de passe
        <div className="input-container">
          <input
            type="password"
            name="newPassword"
            value={userData.password}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/editIcon.png" alt="Edit new password" />
        </div>
      </label>

      <label>
        Confirmer le mot de passe
        <div className="input-container">
          <input
            type="password"
            name="confirmPassword"
            value={userData.passwordConfirm}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/editIcon.png" alt="Confirm password" />
        </div>
      </label>

      <button type="submit" className="save-button">
        Valider les modifications
      </button>
    </form>
  );
}

export default ModifyProfile;
