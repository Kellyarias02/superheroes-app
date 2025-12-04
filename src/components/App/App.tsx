import * as React from "react";
import clsx from "clsx";

import s from "./App.module.css";

import reactIconUrl from "../../assets/react-icon-lg.svg";
import Superheroes from "../Superheroes";
import Unauthenticated from "../Unauthenticated";
import { AuthProvider, useAuth } from "../../contexts/authContext";

const AuthenticatedApp: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <button className={s.logo}>
          <img src={reactIconUrl} /> Superheroes App
        </button>
        <button className={clsx(s["nav-item"], s.logoutBtn)} onClick={logout}>
          Cerrar sesión
        </button>
      </header>
      <main className={s.main}>
        <Superheroes />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <Unauthenticated />;
};

const AppWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;
