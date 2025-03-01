import { useEffect, useState } from "react";
import VerticalRecipeCard from "../../components/VerticalRecipeCard";
import "./RecipePage.css";
import { Link } from "react-router-dom";
import type { RecipeI } from "../../types/RecipeValues";

function RecipePage() {
  const [recipes, setRecipes] = useState<RecipeI[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTime, setSelectedTime] = useState("Temps");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Difficulté");
  const [selectedType, setSelectedType] = useState("Type");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/recettes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  function handleTimeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTime(e.target.value);
  }

  function handleDifficultySelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDifficulty(e.target.value);
  }

  function handleTypeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedType(e.target.value);
  }

  const filteredRecipes = recipes.filter((recipe: RecipeI) => {
    const matchesTime =
      selectedTime === "Temps" || recipe.temps_id === selectedTime;
    const matchesDifficulty =
      selectedDifficulty === "Difficulté" ||
      recipe.difficulte_id === selectedDifficulty;
    const matchesType =
      selectedType === "Type" || recipe.type_id === selectedType;
    return matchesTime && matchesDifficulty && matchesType;
  });

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <div className="main-page-recipe-filter-container">
        <select onChange={handleTimeSelect}>
          <option value="Temps">Temps</option>
          <option value="court">Court</option>
          <option value="moyen">Moyen</option>
          <option value="long">Long</option>
        </select>

        <select onChange={handleDifficultySelect}>
          <option value="Difficulté">Difficulté</option>
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>

        <select onChange={handleTypeSelect}>
          <option value="Type">Type</option>
          <option value="entrée">Entrée</option>
          <option value="plat">Plat</option>
          <option value="dessert">Dessert</option>
          <option value="accompagnement">Accompagnement</option>
          <option value="boisson">Boisson</option>
        </select>
      </div>

      <div
        className={`main-page-recipe-container ${isVisible ? "active" : ""}`}
      >
        {filteredRecipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="link-recipe"
          >
            <VerticalRecipeCard
              id={recipe.id}
              image_url={recipe.image_url}
              titre={recipe.titre}
              temps_id={recipe.temps_id}
              difficulte_id={recipe.difficulte_id}
              type_id={recipe.type_id}
              description={recipe.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipePage;
