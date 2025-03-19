import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../pages/context/useAuth";

function ProtectedRoutes({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      toast.warning(
        "Vous devez vous conneter pour accéder à la création de recette",
      );
    }
  });

  return isLogged ? children : null;
}
export default ProtectedRoutes;
