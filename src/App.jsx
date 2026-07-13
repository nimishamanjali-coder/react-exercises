import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ToggleMessage from './MessageToggle'
import CharExceedWarning from './CharExceedWarning'
import Profile from './Profile'
function App() {
  return (
    <div>

      <Profile name="Sara" profession="Management" yearsOfExperience={5} isAvailable={true} />
    </div>

  )
}

export default App;
