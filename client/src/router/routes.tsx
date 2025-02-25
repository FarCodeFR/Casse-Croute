import { Navigate } from "react-router-dom";
import ModifyRecipe from "../components/ModifyRecipe";
import UserRecipes from "../components/UserRecipes";
import UserRecipesDelete from "../components/UserRecipesDelete";
import UserRecipesModify from "../components/admin-user-recipes/UserRecipesModify";
import ProtectedRoutes from "../components/protect-context/ProtectedRoutes";
import ProtectedRoutesAdmin from "../components/protect-context/ProtectedRoutesAdmin";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";
import Home from "../pages/Home/Home";
import LegalNotices from "../pages/Legal-notices/LegalNotices";
import Login from "../pages/Login/AuthForm";
import RecipePage from "../pages/RecipePage/RecipePage";
import ViewProfile from "../pages/ViewProfile/ViewProfile";
import DashboardAdmin from "../pages/dashboard-admin/DashBoardAdmin";
import DashboardRecipes from "../pages/dashboard-admin/DashboardRecipes";
import DashBoardUser from "../pages/dashboard-admin/DashboardUser";
import NotFound from "../pages/error/NotFound";
import Recipe from "../pages/recipe/Recipe";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe-page",
    element: <RecipePage />,
  },

  {
    path: "/recipe/:id",
    element: <Recipe recipeId={0} />,
  },
  {
    path: "/modify/:id",
    element: <ModifyRecipe />,
  },
  {
    path: "/create-recipe",
    element: (
      <ProtectedRoutes>
        <CreateRecipe />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/view-profile",
    element: (
      <ProtectedRoutes>
        <ViewProfile />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/user-recipes",
    element: <UserRecipes />,
    children: [
      {
        path: "modify",
        element: <UserRecipesModify />,
      },
      {
        path: "delete",
        element: <UserRecipesDelete />,
      },
    ],
  },
  {
    path: "/dashboard-admin",

    element: (
      <ProtectedRoutesAdmin>
        <DashboardAdmin />
      </ProtectedRoutesAdmin>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard-user" replace />,
      },
      {
        path: "dashboard-user",
        element: (
          <ProtectedRoutesAdmin>
            <DashBoardUser />
          </ProtectedRoutesAdmin>
        ),
      },
      {
        path: "dashboard-recipes",
        element: (
          <ProtectedRoutesAdmin>
            <DashboardRecipes />
          </ProtectedRoutesAdmin>
        ),
      },
    ],
  },
  {
    path: "/legal-notices",
    element: <LegalNotices />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
