import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ email: null, logged: false });
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/currentUser", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setAuth({ email: data.email, logged: true });
        }
      } catch (err) {
        console.log("No active session");
      }
      finally{
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth,loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
