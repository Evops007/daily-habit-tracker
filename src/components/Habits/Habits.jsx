import "./Habits.css"
import { useState } from "react";

export default function Habits({ habits }) {
  const [swipeIndex, setSwipeIndex] = useState(null)
  
  if (!habits || habits.length === 0) {
    return <p>Ingen vaner lagt til ennå.</p>;
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

          {swipeIndex === index && (
            <div className="habitActions">
              <button className="edit">✏️</button>
              <button className="delete">🗑️</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

}
