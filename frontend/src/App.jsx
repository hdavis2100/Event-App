import { useEffect, useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Auth from './components/Auth.jsx'
import PlannerDashboard from './components/PlannerDashboard.jsx';
import EventDetails from './components/EventDetails.jsx';
import Conversations from './components/Conversations.jsx';
import Conversation from './components/Conversation.jsx';
import SeekerDashboard from './components/SeekerDashboard.jsx';
import SeekerEventDetails from './components/SeekerEventDetails.jsx';
import EventsPage from './components/EventsPage.jsx';
import { login, logout, deleteAccount, getSession } from './api.js';

function App() {
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    getSession().then(session => {
      if (session && session.user) {
        setUser(session.user);
      }
    });
  }, []);

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

  if (!user) 
    {
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
        <header>
        <nav>

          <Link to="/">Dashboard</Link>
          <Link to="/conversations">Conversations</Link>
          <Link to="/events">Events</Link>
         
        </nav>
        </header>

        <div>
          
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>

        </div>
        <Routes>
          <Route path="/" element={<SeekerDashboard/>} />
          <Route path="/conversations" element={<Conversations user={user} />} />
          <Route path="/conversations/:otherUserId" element={<Conversation user={user} />} />
          <Route path="/events/:eventId" element={<SeekerEventDetails user={user} />} />
          <Route path="/events" element={<EventsPage user={user} />} />
        </Routes>
        
      </div>
    )
  }

  return (
    <div>

      <header>
        <span>Welcome, {user.name} ({user.role})</span>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/conversations">Conversations</Link>
        </nav>
      </header>
      <h1> Event Planner </h1>

      
      <div>
          
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        
      </div>
      <Routes>
        <Route path="/" element={<PlannerDashboard />} />
        <Route path="/:eventId" element={<EventDetails />} />
        <Route path="/conversations" element={<Conversations user={user} />} />
        <Route path="/conversations/:otherUserId" element={<Conversation user={user} />} />

      </Routes>
      
      
    </div>
  )
}


export default App
