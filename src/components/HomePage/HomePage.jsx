import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false)

  // 🔥 Login først!
  const [isLoginMode, setIsLoginMode] = useState(true);  

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/.netlify/functions/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Bruker registrert!");
      navigate("/apppage");
    } else {
      setMessage(data.error || "Noe gikk galt");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/.netlify/functions/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        remember,  // <-- sendes til login-funksjonen
        }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Feil brukernavn eller passord");
      return;
    }

    navigate("/apppage");
  };

  return (
    <div className="outerSignUpFormContainer">
      
      <h1>{isLoginMode ? "Logg inn" : "Ny bruker"}</h1>

      <div className="signUpFormContainer">

      
        {isLoginMode ? (
          <form className="signUpForm" onSubmit={handleLogin}>
            <div className="form-row">
              <label htmlFor="epost">E-post:</label>
              <input
                id="epost"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="passord">Passord:</label>
              <input
                id="passord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-row rememberMe">
            <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
            />
            <label>Husk meg</label>
            </div>


            <button className="submitButton" type="submit">
              Logg inn
            </button>
          </form>
        ) : (
        
          <form className="signUpForm" onSubmit={handleRegister}>
            <div className="form-row">
              <label htmlFor="epost">E-post:</label>
              <input
                id="epost"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="passord">Passord:</label>
              <input
                id="passord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-row rememberMe">
            <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
            />
            <label>Husk meg</label>
            </div>


            <button className="submitButton" type="submit">
              Opprett bruker
            </button>
          </form>
          
        )}

        {message && <p>{message}</p>}
      </div>

      <p
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setMessage("");
        }}
        style={{ cursor: "pointer", marginTop: "12px" }}
      >
        {isLoginMode ? "Opprett ny bruker" : "Allerede bruker? Logg inn"}
      </p>
    </div>
  );
}
