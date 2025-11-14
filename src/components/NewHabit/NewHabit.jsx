import { useState } from "react"
import "./NewHabit.css"

export default function NewHabit({onExit, handleAddHabit}) {
   
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
      setIsOn(!isOn);
    };

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
                        <input type="text" id="navn" name="navn"/> 
                        <input type="text" id="ikon" maxLength={1} name="ikon" placeholder="🚲"/>
                    </div>                    
                   
                    <div className="extraContainer">
                        <label htmlFor="dato">Fra og med</label>
                        <input type="date" id="dato"name="dato"/>
                        <p id="varsel">Daglig varsel</p>
                        <label className="toggle-switch">
                        <input id="checkbox" name="checkbox" type="checkbox" checked={isOn} onChange={handleToggle} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <button className="saveHabit" type="submit">Lagre</button>
                </form>
            </div>
        </div>
    )
}