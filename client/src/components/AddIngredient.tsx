import "../styles/add-ingredient.css";
import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import type { ChildFormProps } from "../types/AddRecipe";

function AddIngredient({ onDataUpdate }: ChildFormProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleVisible = () => {
    setVisible(true);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    fetch(`${import.meta.env.VITE_API_URL}/api/ingredient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Ingrédient ajouté avec succès.");
          setTimeout(() => setMessage(""), 3000);
          setVisible(false);
          onDataUpdate();
        }
      })
      .catch(() => {
        setMessage("Erreur lors de l'ajout.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={`add-ingredient-container ${visible ? "expanded" : ""}`}>
      {!visible && (
        <div className="add-sign-container">
          <button type="button" className="add-sign" onClick={toggleVisible}>
            +
          </button>
        </div>
      )}

      {visible && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Nom :
              <input type="text" name="nom" placeholder="Ex: Pomme" required />
            </label>
            <label>
              Catégorie :
              <input
                type="text"
                name="categorie"
                placeholder="Ex: Fruit"
                required
              />
            </label>
            <label>
              Saison :
              <select name="saison" required>
                <option value="printemps">Printemps</option>
                <option value="été">Été</option>
                <option value="automne">Automne</option>
                <option value="hiver">Hiver</option>
                <option value="toutes saisons">Toutes saisons</option>
              </select>
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Ajout..." : "Ajouter"}
            </button>
          </form>
          {message && <p className="success-message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default AddIngredient;
