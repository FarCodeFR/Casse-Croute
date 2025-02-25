import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../pages/context/useAuth";

function ProtectedRoutesAdmin({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });

  return isAdmin ? children : null;
}
export default ProtectedRoutesAdmin;
