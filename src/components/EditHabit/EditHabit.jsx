import "../NewHabit/NewHabit.css"
import { useState } from "react";

export default function EditHabit ({onExit, handleEditHabit, habit}) {

    const [isOn, setIsOn] = useState(habit?.varsel || false);
    
    const handleToggle = () => {
      setIsOn(!isOn);
    };
    
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
                        <input type="text" id="navn" name="navn" defaultValue={habit?.navn} />
                        <input type="text" id="ikon" name="ikon" placeholder="🚲" defaultValue={habit?.ikon}/>
                    </div>                    
                   
                    <div className="extraContainer">
                        <label htmlFor="dato">Fra og med</label>
                        <input type="date" id="dato" name="dato" defaultValue={habit?.dato} />
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