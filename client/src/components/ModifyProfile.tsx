import { useState } from "react";
import type { userDataTypes } from "../types/UserData";
import "../styles/modify-profil.css";

const defaultAvatar = "/assets/images/profil.png";

function ModifyProfile() {
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatar);
  const [userData, setUserData] = useState<userDataTypes>({
    email: "",
    pseudo: "",
    personalMessage: "",
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  });

  const handleAvatarError = () => {
    if (avatarSrc !== defaultAvatar) {
      setAvatarSrc(defaultAvatar);
    }
  };

  const handleInputUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <form className="profile-form">
      <div className="avatar-container">
        <img
          className="avatar"
          src={avatarSrc}
          alt="Avatar"
          onError={handleAvatarError}
        />
        <button type="button" className="edit-avatar">
          <img src="/assets/images/modify-icon.png" alt="Modifier l'avatar" />
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
          <img src="/assets/images/modify-icon.png" alt="Edit email" />
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
          <img src="/assets/images/modify-icon.png" alt="Edit pseudo" />
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
          <img
            src="/assets/images/modify-icon.png"
            alt="Edit personal message"
          />
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
          <img src="/assets/images/modify-icon.png" alt="Edit password" />
        </div>
      </label>

      <label>
        Nouveau mot de passe
        <div className="input-container">
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/modify-icon.png" alt="Edit new password" />
        </div>
      </label>

      <label>
        Confirmer le mot de passe
        <div className="input-container">
          <input
            type="password"
            name="passwordConfirm"
            value={userData.passwordConfirm}
            onChange={handleInputUserData}
          />
          <img src="/assets/images/modify-icon.png" alt="Confirm password" />
        </div>
      </label>

      <button type="submit" className="save-button">
        Valider les modifications
      </button>
    </form>
  );
}

export default ModifyProfile;
