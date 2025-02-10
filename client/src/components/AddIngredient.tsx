import "../styles/add-ingredient.css";
import { useState } from "react";

function AddIngredient() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(true);
  };

  return (
    <div className="add-ingredient-container">
      {!visible && (
        <div className="add-sign-container">
          <button type="button" className="add-sign" onClick={toggleVisible}>
            +
          </button>
        </div>
      )}

      {visible && (
        <div>
          <p>Add Ingredient :</p>
          <form>
            <label>
              Nom:
              <input type="text" name="name" />
            </label>
            <label>
              Type:
              <input type="text" name="type" />
            </label>
            <label>
              Unité:
              <input type="text" name="unit" />
            </label>
            <button type="submit">Add Ingredient</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddIngredient;
