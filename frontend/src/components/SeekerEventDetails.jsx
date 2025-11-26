import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getEventById, registerForEvent, getEventComments, addEventComment, unregisterFromEvent, getEventRegistrations, getSeekerInfo } from '../api.js';

function SeekerEventDetails() {

    const [event, setEvent] = useState(null);
    const [comments, setComments] = useState([]);
    const { eventId } = useParams();  
    const [isLoading, setIsLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    useEffect(() => {
        getEventById(eventId).then(data => {
            if (data.success) {
                setEvent(data.event);
                setIsLoading(false);
            } else {
                alert('Failed to fetch event details: ' + data.message);
            }
        });
        getEventComments(eventId).then(commentData => {
            if (commentData.success) {
                setComments(commentData.eventComments);
                setCommentLoading(false);
            } else {
                alert('Failed to fetch event comments: ' + commentData.message);
            }
        });
        getSeekerInfo().then(regData => {
            if (regData.success){
                let registeredEventIds = regData.registeredEvents.map(reg => reg.event_details.id);
                setIsRegistered(registeredEventIds.includes(parseInt(eventId)));
            }
            else {
                alert('Failed to fetch seeker events: ' + regData.message);
            }
        });

        
    }, [eventId]);
    if (isLoading || commentLoading) {
        return <div>Loading...</div>;
    }
    if (!event) {
        return <div>Loading...</div>;
    }
    function handleRegister(e) {
        e.preventDefault();
        let data = {
            password: e.target.password.value
        };
        registerForEvent(eventId, data).then(response => {
            if (response.success) {
                alert('Successfully registered for event!');
            } else {
                alert('Failed to register for event: ' + response.message);
            }
        });
    }

    function handleUnregister() {
        unregisterFromEvent(eventId).then(response => {
            if (response.success) {
                alert('Successfully unregistered from event!');
            } else {
                alert('Failed to unregister from event: ' + response.message);
            }
        });
    }
    function handleAddComment(e) {
        e.preventDefault();
        let data = {
            event_id: eventId,
            comment: e.target.comment.value
        }
        e.target.reset();
        addEventComment(data).then(response => {
            if (response.success) {
                setComments(prevComments => [...prevComments, response.eventMessage.message]);
            } else {
                alert('Failed to add comment: ' + response.message);
            }
        });
    }
    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(event.end_time).toLocaleString()}</p>
            {event.is_private && !isRegistered && (
                <form onSubmit={handleRegister}>
                    <input type="password" name="password" placeholder="Event Password" required />
                    <button type="submit">Register for Event</button>
                </form>
            )}
            {!event.is_private && !isRegistered && (
                <button onClick={handleRegister}>Register for Event</button>
            )}
            {isRegistered && <button onClick={handleUnregister}>Unregister from Event</button>}
            <h3>Comments:</h3>
            <ul>
                {comments.map(comment => (
                    <li>{comment.user.name}: {comment.message} <em>({new Date(comment.created_at).toLocaleString()})</em></li>
                ))}

            </ul>
            <form onSubmit={handleAddComment}>
                <input type="text" name="comment" placeholder="Add a comment" required />
                <button type="submit">Submit Comment</button>
            </form>
            <Link to="/">Back to Dashboard</Link>
            <Link to="/events">Back to Events</Link>
        </div>
    );
}
export default SeekerEventDetails;