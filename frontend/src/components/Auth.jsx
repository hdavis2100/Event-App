import { useState } from 'react';
import { register, login } from '../api.js';

function Auth({ onLoggedIn }) {
  const [mode, setMode] = useState('login');
  const [logName, setLogName] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('seeker');

  const isLogin = mode === 'login';

  function handleLogin(e) {
    e.preventDefault();

    const payload = {
      name: logName,
      password: logPassword,
    };

    login(payload).then((response) => {
      if (response.success) {
        onLoggedIn(response.user);
      } else {
        alert('Login failed: ' + response.message);
      }
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    const payload = {
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
    };

    register(payload).then((response) => {
      if (response.success) {
        onLoggedIn(response.user);
      } else {
        alert('Registration failed: ' + response.message);
      }
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1>Welcome to EventBridge</h1>
          <p>
            Sign in as a planner to create events, or as a seeker to discover and
            register for them.
          </p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={`auth-toggle__btn ${
              isLogin ? 'auth-toggle__btn--active' : ''
            }`}
            onClick={() => setMode('login')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`auth-toggle__btn ${
              !isLogin ? 'auth-toggle__btn--active' : ''
            }`}
            onClick={() => setMode('register')}
          >
            Create account
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="field">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={logName}
                onChange={(e) => setLogName(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={logPassword}
                onChange={(e) => setLogPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="field">
              <label htmlFor="register-username">Username</label>
              <input
                id="register-username"
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>
            <div className="field field--inline">
              <input
                id="register-is-planner"
                type="checkbox"
                checked={regRole === 'planner'}
                onChange={(e) =>
                  setRegRole(e.target.checked ? 'planner' : 'seeker')
                }
              />
              <label htmlFor="register-is-planner">
                Register as <strong>event planner</strong>
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </form>
        )}

        <p className="auth-meta">
          For demos, create one planner and one seeker account so you can show both
          dashboards in interviews.
        </p>
      </div>
    </div>
  );
}

export default Auth;
