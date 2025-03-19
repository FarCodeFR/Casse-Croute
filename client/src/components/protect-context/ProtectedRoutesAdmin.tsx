import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../pages/context/useAuth";

function ProtectedRoutesAdmin({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      toast.warning("Vous n'avez pas les droits suffisants !");
    }
  });

  return isAdmin ? children : null;
}
export default ProtectedRoutesAdmin;
