import { useEffect, useState } from "react";
import VerticalRecipeCard from "../../components/VerticalRecipeCard";
import "./RecipePage.css";
import { Link } from "react-router-dom";
import type { RecipeII } from "../../types/RecipeValues";

function RecipePage() {
  const [recipes, setRecipes] = useState<RecipeII[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTime, setSelectedTime] = useState("Temps");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Difficulté");
  const [selectedType, setSelectedType] = useState("Type");
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeII[]>([]);

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

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      const filtered = recipes.filter((recipe: RecipeII) => {
        const matchesTime =
          selectedTime === "Temps" || recipe.temps_preparation === selectedTime;
        const matchesDifficulty =
          selectedDifficulty === "Difficulté" ||
          recipe.difficulte === selectedDifficulty;
        const matchesType =
          selectedType === "Type" || recipe.type_recette === selectedType;
        return matchesTime && matchesDifficulty && matchesType;
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [recipes, selectedTime, selectedDifficulty, selectedType]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const recipeCards = document.querySelectorAll(".link-recipe");
    recipeCards.forEach((recipeCard, index) => {
      setTimeout(() => {
        recipeCard.classList.add("view");
      }, 100 * index);
    });
  }, [filteredRecipes]);

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
          <option value="Court">Court</option>
          <option value="Moyen">Moyen</option>
          <option value="Long">Long</option>
        </select>

        <select onChange={handleDifficultySelect}>
          <option value="Difficulté">Difficulté</option>
          <option value="Facile">Facile</option>
          <option value="Moyen">Moyen</option>
          <option value="Difficile">Difficile</option>
        </select>

        <select onChange={handleTypeSelect}>
          <option value="Type">Type</option>
          <option value="Entrée">Entrée</option>
          <option value="Plat">Plat</option>
          <option value="Dessert">Dessert</option>
          <option value="Accompagnement">Accompagnement</option>
          <option value="Boisson">Boisson</option>
        </select>
      </div>
      <div className="main-page-recipe-container">
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
              temps_preparation={recipe.temps_preparation}
              difficulte={recipe.difficulte}
              type_recette={recipe.type_recette}
              description={recipe.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipePage;
