import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './components/HomePage/HomePage'
import AppPage from './components/AppPage/AppPage';
import NewHabit from './components/NewHabit/NewHabit';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/apppage' element={<AppPage />} />
      </Routes>
    </Router>
  )
}

export default App
