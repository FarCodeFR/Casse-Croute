import { NavLink, useOutletContext } from "react-router-dom";
import SeeProfile from "../../components/SeeProfile";
import type { OutletContext } from "../../types/UserData";
import "./ViewProfile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HorizontalRecipeCard from "../../components/HorizontalRecipeCard";
import type { RecipeCardHorizontal } from "../../types/RecipeValues";

function Profile() {
  const { user } = useOutletContext<OutletContext>();
  const [recipes, setRecipes] = useState<RecipeCardHorizontal[]>([]);
  const [modifyRecipe, setModifyRecipe] = useState(false);
  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const [loading, setLoading] = useState(true);

  const recipeModify = () => {
    setModifyRecipe((modifyRecipe) => !modifyRecipe);
  };
  const recipeDelete = () => {
    setDeleteRecipe((deleteRecipe) => !deleteRecipe);
  };

  // Recipe user

  useEffect(() => {
    if (user.id && user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/user/${user.id}/recipes`)
        .then((response) => response.json())
        .then((data: RecipeCardHorizontal[]) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(`Erreur lors de la récupération des recettes ${err}`);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p>Recette en cours de chargement</p>;
  }

  // Recipe delete

  const recipeUserDelete = (recetteId: number | undefined) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return toast.error("Accès refusé : droits insuffisants.");
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/recette/${recetteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        toast.success("Recette supprimé avec succès 🎉");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recette) => recette.recette_id !== recetteId),
        );
      } else if (response.status === 403) {
        toast.error("Accès refusé : droits insuffisants.");
      } else {
        toast.error("Erreur lors de la supression");
      }
    });
  };

  return (
    <section className="view-profile_content">
      {user && (
        <>
          <SeeProfile user={user} />
          <section className="container-recipes-user">
            <nav>
              <button
                style={{
                  backgroundColor: modifyRecipe ? "#FFF" : "",
                }}
                onClick={recipeModify}
                type="button"
              >
                Modifier
              </button>
              <button
                style={{
                  backgroundColor: deleteRecipe ? "#FFF" : "",
                }}
                onClick={recipeDelete}
                type="button"
              >
                Supprimer
              </button>
            </nav>
            <figure>
              {recipes.map((el, index) => {
                return (
                  <section key={el.recette_id}>
                    {modifyRecipe ? (
                      <NavLink
                        key={`${el.recette_id}-${index}`}
                        to={`/modify/${el.recette_id}`}
                      >
                        <button type="button">
                          <img
                            src="/assets/images/modify-icon.png"
                            alt="logo modifier"
                          />
                        </button>
                        <HorizontalRecipeCard
                          titre={el.titre}
                          description={el.description}
                          image_url={el.image_url}
                        />
                      </NavLink>
                    ) : deleteRecipe ? (
                      <section key={`${el.recette_id}-${index}`}>
                        <button
                          type="button"
                          onClick={() => recipeUserDelete(el.recette_id)}
                        >
                          <img
                            src="/assets/images/divers/delete.png"
                            alt="logo supprimer"
                          />
                        </button>

                        <HorizontalRecipeCard
                          titre={el.titre}
                          description={el.description}
                          image_url={el.image_url}
                        />
                      </section>
                    ) : (
                      <NavLink
                        key={`${el.recette_id}-${index}`}
                        to={`/recipe/${el.recette_id}`}
                      >
                        <HorizontalRecipeCard
                          titre={el.titre}
                          description={el.description}
                          image_url={el.image_url}
                        />
                      </NavLink>
                    )}
                  </section>
                );
              })}
            </figure>
          </section>
        </>
      )}
    </section>
  );
}

export default Profile;
