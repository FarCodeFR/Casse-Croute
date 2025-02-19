import { useState } from "react";
import { toast } from "react-toastify";
import type { userData } from "../types/UserData";

function ModifyProfile({
  user,
  setUser,
}: {
  user: userData;
  setUser: (user: userData) => void;
}) {
  const [formData, setFormData] = useState<userData>({
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
    est_admin: user.est_admin,
    photo_profil: user.photo_profil,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:3310/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser: userData = await response.json();
        setUser(updatedUser);
        toast.success("Profil mis à jour avec succès 🎉");
      } else if (response.status === 400) {
        toast.error("Données invalides, vérifiez vos informations ⚠️");
      } else if (response.status === 401) {
        toast.error("Non autorisé, veuillez vous reconnecter 🔑");
      } else if (response.status === 409) {
        toast.error("Cet email est déjà utilisé ❌");
      } else {
        toast.error("Erreur lors de la mise à jour du profil 🤦‍♂️");
      }
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Une erreur inattendue est survenue 🚨");
    }
  };

  return (
    <form className="modify-profile" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <label htmlFor="pseudo">Identifiant:</label>
      <input
        type="text"
        id="pseudo"
        name="pseudo"
        value={formData.pseudo}
        onChange={handleInputChange}
      />

      <button type="submit">Sauvegarder</button>
    </form>
  );
}

export default ModifyProfile;
