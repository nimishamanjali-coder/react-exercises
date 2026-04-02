import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ToggleMessage from './MessageToggle'
import CharExceedWarning from './CharExceedWarning'
function App() {


  return (
    <div>
      <>Hello world!</>
      <ToggleMessage />
      <br />

      <CharExceedWarning />
    </div>
  )
}

export default App
