import { useEffect, useState } from 'react'
import './App.css'
import Auth from './components/Auth.jsx'
import PlannerDashboard from './components/PlannerDashboard.jsx';
// import SeekerDashboard from './components/SeekerDashboard.jsx';
import { logout, deleteAccount } from './api.js';

function App() {
  
  const [user, setUser] = useState(null);
  
  
  

  function handleLoggedIn(loggedInUser) {
    setUser(loggedInUser);
  }

  useEffect(() => {

    login().then(response => {
        if (response.success) {
            setUser(response.user);
        }
    });

  }, []);

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

  

  return (
    <div>

      <h1> Event Planner </h1>

      {user ? (
        <div>
          <p> Welcome, {user.name} ({user.role}) </p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
          {user.role === 'planner' ? (
            <PlannerDashboard />
          ) : (
            <SeekerDashboard />
          )}
        </div>
      ) : (
        <Auth onLoggedIn={handleLoggedIn} />
      )}
    </div>
  )
}


export default App
