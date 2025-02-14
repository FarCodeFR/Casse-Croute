import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  titre: string;
  description: string;
  image_url: string;
}

function MyProfileRecipes({ userId }: { userId: number }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/user/${userId}/recipes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des recettes");

        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (err) {
        setError("Impossible de charger les recettes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  return (
    <section className="my-profile-recipes">
      {loading && <p>Chargement des recettes...</p>}
      {error && <p>{error}</p>}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={recipe.image_url} alt={recipe.titre} />
            <h3>{recipe.titre}</h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MyProfileRecipes;
