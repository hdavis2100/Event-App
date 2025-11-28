import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getPrivateMessagesWithUser, sendPrivateMessage } from '../api.js';
import { useParams } from 'react-router-dom';
function Conversation({ user }) {
    const [messages, setMessages] = useState([]);
    const { otherUserId } = useParams();
    const [otherUser, setOtherUser] = useState(null);



    function handleSendMessage(e) {
        e.preventDefault();
        let data = {
            message: e.target.message.value
        }
        e.target.reset();
        sendPrivateMessage(otherUserId, data).then(response => {
            if (response.success) {
                setMessages(prevMessages => [...prevMessages, response.privateMessage]);
            } else {
                alert('Failed to send message: ' + response.message);
            }
        });
    }
    useEffect(() => {
        getPrivateMessagesWithUser(otherUserId).then(data => {
            if (data.success) {
                setMessages(data.privateMessages);
                setOtherUser(data.otherUser);
            } else {
                alert('Failed to fetch private messages: ' + data.message);
            }
        });
    },  [otherUserId]);
    return (
        <div>
            <h2>Conversation with User {otherUserId}</h2>
            <ul>
                {messages.map((msg) => (
                    <li> 
                        <strong>{msg.sender_id === user.id ? 'You' : `User ${otherUser.name}` }:</strong> {msg.message} <em>({new Date(msg.created_at).toLocaleString()})</em>
                        
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