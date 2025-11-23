import { useState } from 'react'
import './App.css'

function App() {
  
  const [user, setUser] = useState(null);

  function handleLoggedIn(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleLogout() {
    setUser(null);
  }
  

  return (
    <div>

      <h1> Event Planner </h1>

      {user ? (
        <div>
          <p> Welcome, {user.name} ({user.role}) </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Auth onLoggedIn={handleLoggedIn} />
      )}
    </div>
  )
}


export default App
