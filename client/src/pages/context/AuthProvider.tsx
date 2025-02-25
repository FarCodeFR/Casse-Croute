import { type ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AuthContextType } from "../../types/UserData";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setIsLogged(false);
      setIsAdmin(0);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/verify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setIsLogged(true);
        setIsAdmin(data.isAdmin === 1 ? 1 : 0);
        localStorage.setItem(
          "isAdmin",
          (data.isAdmin === 1 ? 1 : 0).toString(),
        );
      } else {
        setIsLogged(false);
        setIsAdmin(0);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("isAdmin");
        toast.error("Connexion expirée. Veuillez vous reconnecter.");
      }
    } catch (err) {
      console.error(err);
      setIsLogged(false);
      setIsAdmin(0);
      toast.error("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, isAdmin, checkLogin, setIsLogged, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
