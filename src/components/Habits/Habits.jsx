import { useState } from "react";
import NewHabit from "../NewHabit/NewHabit";

export default function Habits({ habits }) {
  if (!habits || habits.length === 0) {
    return <p>Ingen vaner lagt til ennå.</p>;
  }

  return (
    <ul>
      {habits.map((habit, index) => (
        <li key={index}>
          {habit.ikon} {habit.navn} – starter {habit.dato}{" "}
          {habit.varsel ? "(med varsel)" : ""}
        </li>
      ))}
    </ul>
  );
}
