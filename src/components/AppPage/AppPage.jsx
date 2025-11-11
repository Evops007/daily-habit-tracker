import { useState } from "react"
import AddButton from "../AddButton/AddButton"
import AddHabit from "../AddHabit/AddHabit"
import NewHabit from "../NewHabit/NewHabit"
import Habits from "../Habits/Habits"
import "./AppPage.css"

export default function AppPage() {
    const [showContent, setShowContent] = useState(false)
    const [showNewHabit, setShowNewHabit] = useState(false);
    const [habits, setHabits] = useState([])

    const exitNewHabit = () => {
        setShowNewHabit(false)
    }

    const handleAddClick = () => {
        setShowNewHabit(true);
    }

    const handleAddHabit = (newHabit) => {
        setHabits((prev) => [...prev, newHabit])
    }

    return (
        <div className="container">
            <h1>
                Vaner
            </h1>
            <div className="calendar">
                <p>Her kommer kalender</p>
            </div>
                
            <div className="habitContainer">
                {showContent ? <Habits habits={habits} /> : <AddHabit />}
                <AddButton onClick={handleAddClick} />
            </div>
          

            {showNewHabit && 
                <div className="newHabitContainer">
                    <NewHabit onExit={exitNewHabit} handleAddHabit={handleAddHabit} />
                </div>
            }
            
        </div>
    )
}