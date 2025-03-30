import { type ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AuthContextType, userData } from "../../types/UserData";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [isAdmin, setIsAdmin] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userData | null>(null);

  // Profil context
  useEffect(() => {
    {
      isLogged;
      const userProfil = async () => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          return;
        }

        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/user/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (!response.ok) {
            toast.error("Erreur lors de la récupération du profil");
          }

          const data: userData = await response.json();
          setUser(data);
        } catch (err) {
          toast.error("Impossible de charger le profil.");
        } finally {
        }
      };

      userProfil();
    }
  }, [isLogged]);

  //  Login verification

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setIsLogged(false);
      setLoading(false);
      setUser(null);
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
        setUser(data);
      } else {
        setIsLogged(false);
        setUser(null);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("isAdmin");
        toast.error("Connexion expirée. Veuillez vous reconnecter.");
      }
    } catch (err) {
      console.error(err);
      setIsLogged(false);
      setUser(null);
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
      value={{
        isLogged,
        user,
        checkLogin,
        setIsLogged,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
