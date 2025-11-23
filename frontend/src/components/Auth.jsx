import {useState} from 'react';
import { register, login } from '../api.js';

function Auth({onLoggedIn}) {

    const [logName, setLogName] = useState('');
    const [logPassword, setLogPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regRole, setRegRole] = useState('seeker');

    function handleLogin(e) {

        e.preventDefault();

        let data = {
            name: logName,
            password: logPassword
        };

        login(data).then(response => {
            if (response.success) {
                onLoggedIn(response.user);
            } else {
                alert('Login failed: ' + response.message);
            }
        });

    }

    function handleRegister(e) {
        e.preventDefault();

        let data = {
            name: regName,
            email: regEmail,
            password: regPassword,
            role: regRole
        };

        register(data).then(response => {
            if (response.success) {
                onLoggedIn(response.user);
            } else {
                alert('Registration failed: ' + response.message);
            }
        });
    }

    return (
        <div>
            <h2> Login </h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={logName} onChange={e => setLogName(e.target.value)}/>
                <input type="password" placeholder="Password" value={logPassword} onChange={e => setLogPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            
            <h2> Register </h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={regName} onChange={e => setRegName(e.target.value)}/>
                <input type="email" placeholder="Email" value={regEmail} onChange={e => setRegEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={regPassword} onChange={e => setRegPassword(e.target.value)}/>
                <input type="checkbox" checked={regRole === 'planner'} onChange={e => setRegRole(e.target.checked ? 'planner' : 'seeker')}/> Register as Event Planner
                <button type="submit">Register</button>
            </form>
        </div>

    );

}
export default Auth;
