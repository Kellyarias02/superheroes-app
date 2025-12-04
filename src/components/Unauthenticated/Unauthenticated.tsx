import * as React from "react";
import s from "./Unauthenticated.module.css";
import { useAuth } from "../../contexts/authContext";
import Button from "../Button";

function Unauthenticated() {

  const formRef = React.useRef<HTMLFormElement>(null);
  const {login, signup} = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [activeTab, setActiveTab] = React.useState("login");
  const [signUpErrors, setSignUpErrors] = React.useState(null);
  const [emailError, setEmailError] = React.useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
  
    if (!validateEmail(email)) {
      return;
    }
  
    setStatus("loading");
  
    if (activeTab === "login") {
      login(email, password)
        .then(() => {
          setStatus("success");
          formRef.current?.reset();
        })
        .catch((error) => {
          setStatus("error");
          
          setSignUpErrors(error.message || "Credenciales inválidas");
        });
    } else {
      signup(email, password, username)
        .then(() => {
          setStatus("success");
          formRef.current?.reset();
        })
        .catch((error) => {
          setStatus("error");
       
          setSignUpErrors(error.message || "No se pudo completar el registro");
        });
    }
  }


  function handleTabChange(tab: "login" | "signup") {
    setActiveTab(tab);
    setStatus("idle");
    formRef.current?.reset(); 
    setEmailError(""); 
  }

  const isLoading = status === "loading";
  const buttonText = activeTab === "login" ? "Enter" : "Create";
  const hasError = status === "error";

  return (
    <div className={s.pageWrapper}>
      <div className={s.container}>
        <h1 className={s.title}>App Superheroes</h1>
        <div className={s.tabs}>
          <button
            onClick={() => handleTabChange("login")}
            className={activeTab === "login" ? s.active : ""}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange("signup")}
            className={activeTab === "signup" ? s.active : ""}
          >
            Signup
          </button>
        </div>
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className={s.form}
          autoComplete="off"
        >
          {activeTab === "signup" && (
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Your name"
                required
                minLength={3}
                autoComplete="off"
              />
            </div>
          )}
      
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              required
              onChange={(e) => validateEmail(e.target.value)}
              autoComplete="off"
            />
            {emailError && <span className={s.error}>{emailError}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Loading..." : buttonText}
          </Button>
        </form>
        {hasError && (
          <p className={s["error-message"]}>
            {signUpErrors || "Invalid Credentials"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Unauthenticated;
