import { useState } from "react"
import AddButton from "../AddButton/AddButton"
import AddHabit from "../AddHabit/AddHabit"
import NewHabit from "../NewHabit/NewHabit"
import EditHabit from "../EditHabit/EditHabit"
import Habits from "../Habits/Habits"
import "./AppPage.css"

export default function AppPage() {
    const [showContent, setShowContent] = useState(false)
    const [showNewHabit, setShowNewHabit] = useState(false);
    const [habits, setHabits] = useState([])
    const [showEditHabit, setShowEditHabit] = useState(true);
    const [editingHabit, setEditingHabit] = useState(null);

    const exitNewHabit = () => {
        setShowNewHabit(false)
    }

     const exitEditHabit = () => {
        setShowEditHabit(false)
    }

    const handleAddClick = () => {
        setShowNewHabit(true);
    }

    const handleAddHabit = (newHabit) => {
        setHabits((prev) => [...prev, newHabit])
        setShowContent(true)
        console.log(habits)
    }

    const handleDeleteHabit = (idToRemove) => {
        setHabits(prev => prev.filter(habit => habit.id !== idToRemove));
    }

    /*const handleEditHabit = (idToEdit) => {
        const habitIdToEdit = habits.find(item => item.id === idToEdit)
        setShowEditHabit(true)
        setEditingHabit(habitIdToEdit)
        console.log(habitIdToEdit)
    }*/

    const handleEditHabit = (updatedHabit) => {
        setHabits(prev => prev.map(habit => 
            habit.id === updatedHabit.id ? updatedHabit : habit
        ))
        setShowEditHabit(false)
    }

    const handleOpenEditHabit = (idToEdit) => {
        const habitToEdit = habits.find(item => item.id === idToEdit)
        setShowEditHabit(true)
        setEditingHabit(habitToEdit)
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
                {showContent ? <Habits habits={habits} onDelete={handleDeleteHabit} onEdit={handleOpenEditHabit} /> : <AddHabit />}
                <AddButton onClick={handleAddClick} />
            </div>
          

            {showNewHabit && 
                <div className="newHabitContainer">
                    <NewHabit onExit={exitNewHabit} handleAddHabit={handleAddHabit} />
                </div>
            }

            {showEditHabit &&
                <div className="newHabitContainer">
                    <EditHabit onExit={exitEditHabit} handleEditHabit={handleEditHabit} habit={editingHabit} />
                </div>
            }

        </div>
    )
}