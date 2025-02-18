import { type ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AuthContextType } from "../../types/UserData";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // loading state will control the rendering of the AuthProvider
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setIsLogged(false);
      setIsAdmin(false);
      setLoading(true);
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
      // response.ok can be true or false.
      if (response.ok) {
        const data = await response.json();
        setIsLogged(true);
        setIsAdmin(data.est_admin);
      }
      setIsLogged(response.ok);
      if (!response.ok) {
        toast.error("Connexion expirée. Veuillez vous reconnecter.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      // this state is useful to render the AuthContext.Provider only when it's true.
      setLoading(true);
    }
  }

  if (loading)
    return (
      <AuthContext.Provider
        value={{ isLogged, isAdmin, checkLogin, setIsLogged, setIsAdmin }}
      >
        {children}
      </AuthContext.Provider>
    );
};
