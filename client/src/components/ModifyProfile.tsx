import "../styles/modify-profil.css";

const ModifyProfile = () => {
  return (
    <form className="profile-form">
      <div className="avatar-container">
        <img className="avatar" src="/assets/images/profil.png" alt="Avatar" />
        <button type="button" className="edit-avatar">
          <img src="/assets/images/modify-icon.png" alt="Modifier l'avatar" />
        </button>
      </div>

      <label>
        Email
        <div className="input-container">
          <input type="email" name="email" defaultValue="user@email.com" />
          <img src="/assets/images/modify-icon.png" alt="Edit email" />
        </div>
      </label>

      <label>
        Pseudo
        <div className="input-container">
          <input type="text" name="pseudo" defaultValue="Pseudo" />
          <img src="/assets/images/modify-icon.png" alt="Edit pseudo" />
        </div>
      </label>

      <label>
        Phrase perso
        <div className="input-container">
          <input type="text" name="personalMessage" defaultValue="Message" />
          <img
            src="/assets/images/modify-icon.png"
            alt="Edit personal message"
          />
        </div>
      </label>

      <label>
        Mot de passe actuel
        <div className="input-container">
          <input type="password" name="currentPassword" defaultValue="" />
          <img src="/assets/images/modify-icon.png" alt="Edit password" />
        </div>
      </label>

      <label>
        Nouveau mot de passe
        <div className="input-container">
          <input type="password" name="password" defaultValue="" />
          <img src="/assets/images/modify-icon.png" alt="Edit new password" />
        </div>
      </label>

      <label>
        Confirmer le mot de passe
        <div className="input-container">
          <input type="password" name="passwordConfirm" defaultValue="" />
          <img src="/assets/images/modify-icon.png" alt="Confirm password" />
        </div>
      </label>

      <button type="submit" className="save-button">
        Valider les modifications
      </button>
    </form>
  );
};

export default ModifyProfile;
