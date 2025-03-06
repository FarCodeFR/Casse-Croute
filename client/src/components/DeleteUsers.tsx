import { useNavigate } from "react-router-dom";
import "../styles/delete.users.css";
import { toast } from "react-toastify";
import type { DeleteUserProps } from "../types/UserData";

function DeleteUsers({ handleVisibility, selectUser }: DeleteUserProps) {
  const navigation = useNavigate();
  const handleClick = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return toast.warning("Accès refusé : droits insuffisants.");
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${selectUser.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 204) {
        toast.success("Utilisateur supprimé avec succès 🎉");
        navigation("/dashboard-admin");
      } else if (response.status === 403) {
        toast.error("Accès refusé : droits insuffisants.");
      } else {
        toast.error("Erreur lors de la supression");
      }
    });
  };
  return (
    <figure className="container-delete-users">
      <h3>Êtes-vous sûres de vouloir supprimer cette utilisateur?</h3>
      <button aria-label="Oui" onClick={handleClick} type="button">
        Oui
      </button>
      <button aria-label="Non" onClick={handleVisibility} type="button">
        Non
      </button>
    </figure>
  );
}

export default DeleteUsers;
