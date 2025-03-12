import { useEffect } from "react";
import Carousel from "../../components/Carousel";
import IngredientsSeason from "../../components/IngredientsSeason";
import LatestArrival from "../../components/LatestArrival";
import RecipesSeason from "../../components/RecipesSeason";
import TopRecipes from "../../components/TopRecipes";
import "./home.css";

function Home() {
  useEffect(() => {
    const componentView = document.querySelectorAll(".home-component");
    componentView.forEach((component, index) => {
      setTimeout(() => {
        component.classList.add("view");
      }, 100 * index);
    });
  });
  return (
    <>
      <div className="home-component">
        <Carousel />
      </div>
      <div className="home-component">
        <TopRecipes />
      </div>
      <div className="home-component">
        <RecipesSeason />
      </div>
      <div className="home-component">
        <IngredientsSeason />
      </div>
      <div className="home-component">
        <LatestArrival />
      </div>
    </>
  );
}

export default Home;
