import "./Habits.css"
import { useState } from "react";
import AddHabit from "../AddHabit/AddHabit";

export default function Habits({ habits, onDelete, onEdit }) {
  const [swipeIndex, setSwipeIndex] = useState(null);
  
  if (!habits || habits.length === 0) {
    return <AddHabit />;
  }

  const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    e.currentTarget.dataset.startX = touch.clientX;
  };

  const handleTouchEnd = (e, index) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(e.currentTarget.dataset.startX || 0);
    const diffX = startX - touch.clientX;

    if (diffX > 50) {
      setSwipeIndex(index)
    } else {
      setSwipeIndex(null)
    };
  };

  return (
    <ul className="habitList">
      {habits.map((habit, index) => (
        <div className="habitWrapper" key={index}>
          <li
            className={`habitLi ${swipeIndex === index ? "swiped" : ""}`}
            key={index}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onTouchEnd={(e) => handleTouchEnd(e, index)}
            onClick={() => {
              const checkbox = document.getElementById(`complete-${index}`);
              if (checkbox) checkbox.checked = !checkbox.checked;
            }}
          >
            <span className="completeHabitInput">
              <label className="custom-checkbox">
                <input id={`complete-${index}`} type="checkbox" name={`complete-${index}`} />
                <span className="checkmark" aria-hidden="true"></span>
              </label>
            </span>

            <span className="habitIkon">{habit.ikon}</span>
            <span className="habitNavn">{habit.navn}</span>
          </li>
          <div className={`habitActions ${swipeIndex === index ? "show" : ""}`}>
            <button 
              className="edit"
              onClick={(e) => {e.stopPropagation(); if (onEdit) onEdit(habit.id); setSwipeIndex(null); }}
            >
            <i className="fa-regular fa-pen-to-square"></i></button>
            
            <button 
              className="delete"
              onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete(habit.id); setSwipeIndex(null); }}
            >
            <i className="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      ))}
    </ul>
  );

}
