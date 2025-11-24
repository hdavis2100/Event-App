import { useEffect, useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Auth from './components/Auth.jsx'
import PlannerDashboard from './components/PlannerDashboard.jsx';
// import SeekerDashboard from './components/SeekerDashboard.jsx';
import { login, logout, deleteAccount } from './api.js';

function App() {
  
  const [user, setUser] = useState(null);
  
  
  

  function handleLoggedIn(loggedInUser) {
    setUser(loggedInUser);
  }

  

  function handleLogout() {
    
    logout().then(response => {
        if (response.success) {
            setUser(null);
        } else {
            alert('Logout failed: ' + response.message);
        }
    });
  }

  function handleDeleteAccount() {
    deleteAccount().then(response => {
        if (response.success) {
            setUser(null);
        } else {
            alert('Account deletion failed: ' + response.message);
        }
    });
  }

  if (!user) {
    return (
    <div>
    <Auth onLoggedIn={handleLoggedIn} />;
    </div>

    )
  }

  
  if (user.role === 'seeker') {
    return (
      <div>
        <header>

          <span>Welcome, {user.name} ({user.role})</span>
        </header>

        <h1> Event Seeker </h1>

        <nav>
         
        </nav>

        <div>
          
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>

        </div>
        
      </div>
    )
  }

  return (
    <div>

      <header>
        <span>Welcome, {user.name} ({user.role})</span>
        <nav>
          <Link to="/">Dashboard</Link>
        </nav>
      </header>
      <h1> Event Planner </h1>

      
      <div>
          
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        
      </div>
      <Routes>
        <Route path="/" element={<PlannerDashboard />} />
      </Routes>
      
      
    </div>
  )
}


export default App
