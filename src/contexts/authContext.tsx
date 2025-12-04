import * as React from "react";
import { baseUrl, tokenKey } from "../constants";

interface User {
  email: string;
  username: string;
} 


interface SignupCredentials {
  email: string;
  password: string;
  username: string;
}

interface SignupResponse {
  token: string;
}

interface ErrorResponse {
  errors: string | string[];
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  

  signup: (email: string, password: string, username: string) => Promise<void>;
}>({
  isAuthenticated: false,
  user: null,
  login: async () => {
    return Promise.resolve();
  },
  logout: () => {},
  signup:async () => {
    return Promise.resolve(); 
  },
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  
  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);
    const savedUsername = window.localStorage.getItem('username');
    const savedEmail = window.localStorage.getItem('userEmail');

    if (savedToken && savedUsername && savedEmail) {
      setIsAuthenticated(true);
      setUser({
        email: savedEmail,
        username: savedUsername
      });
    }
  }, []);



  async function login(email: string, password: string): Promise<void> {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(baseUrl + "/login", options);

    if (response.ok) {
      const { token } = await response.json();
      const username = email.split('@')[0]; 

      window.localStorage.setItem(tokenKey, token);
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('userEmail', email);
      
    
      setUser({ email, username });
      setIsAuthenticated(true);
      
      console.log('Login successful:', { email, username });
    }
  }


  

  async function signup(email: string, password: string, username: string): Promise<void> {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password, username } as SignupCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(baseUrl + "/signup", options);

    if (response.ok) {
      const { token }: SignupResponse = await response.json();
      window.localStorage.setItem(tokenKey, token);
      window.localStorage.setItem('username', username);
      setIsAuthenticated(true);
      return;
    } else {
      const body: ErrorResponse = await response.json();
      const error =
        body.errors instanceof Array ? body.errors.join(", ") : body.errors;
      return Promise.reject(new Error(error));
    }
  }

  function logout() {
    window.localStorage.removeItem(tokenKey);
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userEmail');
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout , signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
