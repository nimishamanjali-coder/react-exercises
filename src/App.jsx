// ========================================
// OLD VERSION: WITHOUT REACT ROUTER
// ========================================
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import ToggleMessage from './MessageToggle'
// import CharExceedWarning from './CharExceedWarning'
// import Profile from './Profile'
// function App() {
//   return (
//     <div>

//       <Profile name="Sara" profession="Management" yearsOfExperience={5} isAvailable={true} />
//     </div>

//   )
// }

// export default App;

// ========================================
// NEW VERSION: WITH REACT ROUTER
// ========================================
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/employees">Employees</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<h1>Employee Management App</h1>}
        />

        <Route
          path="/employees"
          element={
            <Profile
              name="Sara"
              profession="Management"
              yearsOfExperience={5}
              isAvailable={true}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;