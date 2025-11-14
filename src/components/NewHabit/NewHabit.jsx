import { useState } from "react"
import "./NewHabit.css"

export default function NewHabit({onExit, handleAddHabit}) {
    const [navn, setNavn] = useState("");
    const [ikon, setIkon] = useState("");

    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
      setIsOn(!isOn);
    };

    const today = new Date().toISOString().split("T")[0]; // "2025-11-14"

    const handleSubmit = (event) => {
        event.preventDefault();
        const habit = {
            id: crypto.randomUUID(),
            navn: event.target.navn.value,
            ikon: event.target.ikon.value,
            dato: event.target.dato.value,
            varsel: event.target.checkbox.checked
        };
        handleAddHabit(habit);
        onExit();
    }

    

    return (
        <div className="innerHabitContainer">
            <div>
                <button onClick={onExit} className="exitButton"></button>
                <h2>
                    Legg til en ny vane
                </h2>
                <form className="addHabitForm" onSubmit={handleSubmit}>
                    <div className="nameContainer">
                        <label htmlFor="navn">Vanenavn og ikon</label>
                        <label htmlFor="ikon"></label>
                    </div>
                    <div id="nameInput">
                        <input type="text" id="navn" name="navn" onChange={(e) => setNavn(e.target.value)} required/> 
                        <input type="text" id="ikon" name="ikon" placeholder="🚲" onChange={(e) => setIkon(e.target.value)} required/>
                    </div>                    
                   
                    <div className="extraContainer">
                        <label htmlFor="dato">Fra og med</label>
                        <input type="date" id="dato"name="dato" defaultValue={today}/>
                        <p id="varsel">Daglig varsel</p>
                        <label className="toggle-switch">
                        <input id="checkbox" name="checkbox" type="checkbox" checked={isOn} onChange={handleToggle} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <button type="submit" disabled={!navn || !ikon} className={!navn || !ikon ? "disabledButton" : "saveHabit"}>Lagre</button>
                </form>
            </div>
        </div>
    )
}