import { useState, useEffect } from "react"
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
    const [showEditHabit, setShowEditHabit] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [currentUser, setCurrentUser] = useState(null)

    const exitNewHabit = () => {
        setShowNewHabit(false)
    }

     const exitEditHabit = () => {
        setShowEditHabit(false)
    }

    const handleAddClick = () => {
        setShowNewHabit(true);
    }

    useEffect(() => {
    const fetchCurrentUser = async () => {
        const res = await fetch("/.netlify/functions/me"); // lager vi en liten endpoint som returnerer bruker fra JWT
        if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
        }
    }
        fetchCurrentUser();
    }, []);


   const handleAddHabit = async (newHabit) => {
        if (!currentUser) return;

        console.log("Ny vane som skal sendes:", newHabit, "Bruker:", currentUser); // <-- her

        const res = await fetch("/.netlify/functions/addHabit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newHabit, user_id: currentUser.id })
        });

        const savedHabit = await res.json();
        setHabits((prev) => [...prev, savedHabit]);
    };




   /* const handleAddHabit = (newHabit) => {
        setHabits((prev) => [...prev, newHabit])
        setShowContent(true)
        console.log(habits)
    }*/

    const handleDeleteHabit = async (idToRemove) => {
        // Slett fra DB først
        const res = await fetch(`/.netlify/functions/deleteHabit`, {
            method: "POST",  // eller DELETE, avhengig av hvordan du lager funksjonen
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: idToRemove })
        });

        if (res.ok) {
            // Oppdater lokalt state først når DB-sletting lykkes
            setHabits(prev => prev.filter(habit => habit.id !== idToRemove));
        } else {
            console.error("Kunne ikke slette vane i databasen");
        }
    };


   const handleEditHabit = async (updatedHabit) => {
        // Send oppdatering til DB
        const res = await fetch("/.netlify/functions/editHabit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedHabit)
        });

        if (res.ok) {
            // Oppdater lokalt state først når DB lykkes
            setHabits(prev => prev.map(habit =>
                habit.id === updatedHabit.id ? updatedHabit : habit
            ));
            setShowEditHabit(false);
        } else {
            console.error("Kunne ikke oppdatere vane i databasen");
        }
    };


    const handleOpenEditHabit = (idToEdit) => {
        const habitToEdit = habits.find(item => item.id === idToEdit)
        setShowEditHabit(true)
        setEditingHabit(habitToEdit)
    }



   useEffect(() => {
        if (!currentUser) return; // vent til vi har bruker

        const fetchHabits = async () => {
            const res = await fetch("/.netlify/functions/getHabits")
            if (res.ok) {
            const data = await res.json()
            setHabits(data)
            setShowContent(true)
            } else {
            console.error("Kunne ikke hente vaner")
            }
        }

        fetchHabits()
    }, [currentUser])




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