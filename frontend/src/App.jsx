import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth.jsx';
import PlannerDashboard from './components/PlannerDashboard.jsx';
import EventDetails from './components/EventDetails.jsx';
import Conversations from './components/Conversations.jsx';
import Conversation from './components/Conversation.jsx';
import SeekerDashboard from './components/SeekerDashboard.jsx';
import SeekerEventDetails from './components/SeekerEventDetails.jsx';
import EventsPage from './components/EventsPage.jsx';
import { logout, deleteAccount, getSession } from './api.js';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then((session) => {
      if (session && session.user) {
        setUser(session.user);
      }
    });
  }, []);

  function handleLoggedIn(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleLogout() {
    navigate('/');
    logout().then((response) => {
      if (response.success) {
        setUser(null);
      } else {
        alert('Logout failed: ' + response.message);
      }
    });
  }

  function handleDeleteAccount() {
    if (
      !window.confirm(
        'Delete your account and all associated data? This cannot be undone.'
      )
    ) {
      return;
    }

    navigate('/');
    deleteAccount().then((response) => {
      if (response.success) {
        setUser(null);
      } else {
        alert('Account deletion failed: ' + response.message);
      }
    });
  }

  // Unauthenticated state
  if (!user) {
    return (
      <div className="app-shell app-shell--auth">
        <main className="app-main">
          <Auth onLoggedIn={handleLoggedIn} />
        </main>
      </div>
    );
  }

  const isSeeker = user.role === 'seeker';

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          <div className="app-logo">EP</div>
          <div>
            <h1 className="brand-title">Event Planner</h1>
            <p className="brand-subtitle">
              {isSeeker
                ? 'Discover and register for events'
                : 'Plan events and coordinate with attendees'}
            </p>
          </div>
        </div>

        <nav className="app-nav">
          <Link className="app-nav__link" to="/">
            Dashboard
          </Link>
          <Link className="app-nav__link" to="/conversations">
            Conversations
          </Link>
          {isSeeker && (
            <Link className="app-nav__link" to="/events">
              Events
            </Link>
          )}
        </nav>

        <div className="app-header__user">
          <span className="chip chip--user">
            {user.name} <span className="chip__role">({user.role})</span>
          </span>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
          <button
            type="button"
            className="btn btn-danger-outline"
            onClick={handleDeleteAccount}
          >
            Delete account
          </button>
        </div>
      </header>

      <main className="app-main">
        {isSeeker ? (
          <Routes>
            <Route path="/" element={<SeekerDashboard />} />
            <Route path="/conversations" element={<Conversations user={user} />} />
            <Route
              path="/conversations/:otherUserId"
              element={<Conversation user={user} />}
            />
            <Route path="/events" element={<EventsPage user={user} />} />
            <Route
              path="/events/:eventId"
              element={<SeekerEventDetails user={user} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<PlannerDashboard />} />
            <Route path="/:eventId" element={<EventDetails />} />
            <Route path="/conversations" element={<Conversations user={user} />} />
            <Route
              path="/conversations/:otherUserId"
              element={<Conversation user={user} />}
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
