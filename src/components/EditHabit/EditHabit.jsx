import "../NewHabit/NewHabit.css"
import { useState } from "react";

export default function EditHabit ({onExit, handleEditHabit, habit}) {
    const [navn, setNavn] = useState(habit?.navn || "");
    const [ikon, setIkon] = useState(habit?.ikon || "");
    const [isOn, setIsOn] = useState(habit?.varsel || false);
    
    const handleToggle = () => {
      setIsOn(!isOn);
    };

    const today = new Date().toISOString().split("T")[0]; // "2025-11-14"

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedHabit = {
            id: habit?.id,
            navn: event.target.navn.value,
            ikon: event.target.ikon.value,
            dato: event.target.dato.value,
            varsel: event.target.checkbox.checked
        };
        handleEditHabit(updatedHabit);
        onExit();
    }

    return (
        <div className="innerHabitContainer">
            <div>
                <button onClick={onExit} className="exitButton"></button>
                 <h2>
                    Rediger
                </h2>
                <form className="addHabitForm" onSubmit={handleSubmit}>
                    <div className="nameContainer">
                        <label htmlFor="navn">Vanenavn og ikon</label>
                        <label htmlFor="ikon"></label>
                    </div>
                    <div id="nameInput">
                        <input type="text" id="navn" name="navn" defaultValue={habit?.navn} onChange={(e) => setNavn(e.target.value)} required/>
                        <input type="text" id="ikon" name="ikon" placeholder="🚲" defaultValue={habit?.ikon} onChange={(e) => setIkon(e.target.value)} required/>
                    </div>                    
                   
                    <div className="extraContainer">
                        <label htmlFor="dato">Fra og med</label>
                        <input type="date" id="dato" name="dato" defaultValue={today} />
                        <p id="varsel">Daglig varsel</p>
                        <label className="toggle-switch">
                        <input id="checkbox" name="checkbox" type="checkbox" checked={isOn} onChange={handleToggle} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <button disabled={!navn || !ikon} className={!navn || !ikon ? "disabledButton" : "saveHabit"} type="submit">Lagre</button>
                </form>
            </div>
        </div>
    )
}