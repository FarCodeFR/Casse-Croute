import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../pages/context/useAuth";

function ProtectedRoutesAdmin({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user?.est_admin === 0) {
      navigate("/");
      toast.warning("Vous n'avez pas les droits suffisants !");
    }
  });

  return user?.est_admin ? children : null;
}
export default ProtectedRoutesAdmin;
