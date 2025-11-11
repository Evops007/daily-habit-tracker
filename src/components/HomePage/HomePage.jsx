import { Navigate, useNavigate } from "react-router-dom";
import "./HomePage.css"
import { useState } from "react"

export default function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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

    const handleLogin = async () => {
        const res = await fetch("/.netlify/functions/login", {
            body: JSON.stringify({ email, password }),
           method: "POST",
            headers: { "Content-Type": "application/json" },
         });
        const data = await res.json();
        if (res.ok) {
        setMessage(`Innlogget som ${data.email}`);
        // Her kan du også oppdatere state/context for navbar osv.
        } else {
        setMessage(data || "Feil brukernavn eller passord");
        }
    };

    return (
        <div>
            <h1>Ny bruker</h1>
            <div className="signUpForm">
                <form onSubmit={handleRegister}>
                    <div className="form-row">
                        <label htmlFor="epost">E-post:</label>
                        <input 
                            id="epost" 
                            type="text"
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
                    <button className="submitButton" type="submit">Fortsett</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <p onClick={handleLogin}>eller Logg inn</p>
        </div>
    )
}