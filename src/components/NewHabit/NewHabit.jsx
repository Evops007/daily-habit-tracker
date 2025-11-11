import { useState } from "react"
import "./NewHabit.css"

export default function NewHabit({onExit}) {
   
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
      setIsOn(!isOn);
    };

    

    return (
        <div className="innerHabitContainer">
            <div>
                <button onClick={onExit} className="exitButton"></button>
                <h2>
                    Legg til en ny vane
                </h2>
                <form>
                    <div className="nameContainer">
                        <label htmlFor="navn">Vanenavn og ikon</label>
                        <label htmlFor="ikon"></label>
                    </div>
                    <div id="nameInput">
                        <input type="text" id="navn"/> 
                        <input type="text" id="ikon" placeholder="🚲"/>
                    </div>                    
                   
                    <div className="extraContainer">
                        <label htmlFor="dato">Fra og med</label>
                        <input type="date" id="dato"/>
                        <p id="varsel">Daglig varsel</p>
                        <label className="toggle-switch">
                        <input id="checkbox" type="checkbox" checked={isOn} onChange={handleToggle} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <button className="saveHabit" type="submit">Lagre</button>
                </form>
            </div>
        </div>
    )
}