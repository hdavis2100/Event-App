import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getPrivateMessages } from '../api';


function Conversations({ user }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getPrivateMessages().then(data => {
            if (data.success) {
                setMessages(data.privateMessages);
            } else {
                alert('Failed to fetch private messages: ' + data.message);
            }
        });
    }, []);


    conversations = {};

    for (let msg of messages) {
        let senderId = msg.sender_id;
        let receiverId = msg.receiver_id;
        let message = msg.message;

        if (senderId === user.id) {
            if (!conversations[receiverId]) {
                conversations[receiverId] = [];
            }
            conversations[receiverId].push([message, 'sent', message.created_at]);
        } else if (receiverId === user.id) {
            if (!conversations[senderId]) {
                conversations[senderId] = [];
            }
            conversations[senderId].push([message, 'received', message.created_at]);


        }
    }

    for (let key in conversations) {
        conversations[key].sort((a, b) => new Date(a[2]) - new Date(b[2]));
    }
    arrConversations = Object.entries(conversations);

    arrConversations.sort((a, b) => {
        let aLastMsgTime = new Date(a[1][a[1].length - 1][2]);
        let bLastMsgTime = new Date(b[1][b[1].length - 1][2]);
        return bLastMsgTime - aLastMsgTime;
    });

    return (
        <div>
            <h2>Your Conversations</h2>
            <ul>
                {arrConversations.map(([otherUserId, msgs]) => (
                    <li >
                        <Link to={`/conversations/${otherUserId}`}> Conversation with User {otherUserId} </Link>
                        {msgs[msgs.length - 1][1] === 'sent' && <p> {user.name} : {msgs[msgs.length - 1][0]}</p>}
                        {msgs[msgs.length - 1][1] === 'received' && <p> User {otherUserId} : {msgs[msgs.length - 1][0]}</p>}

                    </li>
                ))}
            </ul>

            <Link to="/">Back to Dashboard</Link>
        </div>
    );



}