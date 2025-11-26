import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getPrivateMessagesWithUser, sendPrivateMessage } from '../api.js';

function Conversation({ user }) {
    const [messages, setMessages] = useState([]);

    URLSearchParams = new URLSearchParams(window.location.search);
    const { otherUserId } = useParams();

    function handleSendMessage(e) {
        e.preventDefault();
        let data = {
            receiver_id: otherUserId,
            message: e.target.message.value
        }
        e.target.reset();
        sendPrivateMessage(data).then(response => {
            if (response.success) {
                setMessages(prevMessages => [...prevMessages, response.message]);
            } else {
                alert('Failed to send message: ' + response.message);
            }
        });
    }
    useEffect(() => {
        getPrivateMessagesWithUser(otherUserId).then(data => {
            if (data.success) {
                setMessages(data.messages);
            } else {
                alert('Failed to fetch private messages: ' + data.message);
            }
        });
    }, [otherUserId], [messages]);
    return (
        <div>
            <h2>Conversation with User {otherUserId}</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li> 
                        <strong>{msg.sender_id === user.id ? 'You' : `User ${otherUserId}` }:</strong> {msg.message} <em>({new Date(msg.created_at).toLocaleString()})</em>
                        
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSendMessage}>
                <input type="text" name="message" placeholder="Type your message" required />
                <button type="submit">Send</button>
            </form>

            
            <Link to="/conversations">Back to Conversations</Link>
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
}
export default Conversation;