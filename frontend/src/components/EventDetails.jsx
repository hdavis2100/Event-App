import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { updateEvent, deleteEvent, getEventById, getEventRegistrations, getEventComments} from '../api.js';

function EventDetails() {

    const [event, setEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [comments, setComments] = useState([]);
    const { eventId } = useParams();  
    
    useEffect(() => {
        getEventById(eventId).then(data => {
            if (data.success) {
                
                getEventRegistrations(eventId).then(regData => {
                    if (regData.success) {
                        setRegistrations(regData.registrations);
                    }
                    else {
                        alert('Failed to fetch event registrations: ' + regData.message);
                    }
                });
                
                getEventComments(eventId).then(commentData => {
                    if (commentData.success) {
                        setComments(commentData.comments);  
                    }
                    else {
                        alert('Failed to fetch event comments: ' + commentData.message);
                    }
                });
                
                setEvent(data.event);
                

            } else {
                alert('Failed to fetch event details: ' + data.message);
            }
        
        });
    }, []);

    function handleEditEvent(eventId, e) {
        e.preventDefault();

        let data = {
            title: e.target.title.value,
            description: e.target.description.value,
            location: e.target.location.value,
            start_time: e.target.start_time.value,
            end_time: e.target.end_time.value,
            is_private: e.target.is_private.checked,
            password: e.target.password.value
        }
        e.target.reset()

        updateEvent(eventId, data).then(response => {
            if (!response.success) {
                alert('Failed to update event: ' + response.message);
            }
            
        });
    }
    function handleDeleteEvent(eventId) {
        deleteEvent(eventId).then(response => {
            if (!response.success) {
                alert('Failed to delete event: ' + response.message);
            }
        });
    }

    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p>Private: {event.is_private ? 'Yes' : 'No'}</p>
            <h3>Registrations:</h3>
            <ul>
                {registrations.map(reg => (
                    <li>{reg.name}</li>
                ))}
            </ul>
            <ul>
                {comments.map(comment => (
                    <li>{comment.user}: {comment.text}</li>
                ))}

            </ul>

            <h3> Update Event: </h3>
            <form onSubmit={(e) => handleEditEvent(event.id, e)}>
                <input type="text" name="title" defaultValue={event.title} placeholder="Event Title"/>
                <br/>
                <textarea name="description" defaultValue={event.description} placeholder="Event Description"></textarea>
                <br/>
                <input type="text" name="location" defaultValue={event.location} placeholder="Event Location"/>
                <br/>
                <input type="datetime-local" name="start_time" defaultValue={event.start_time} placeholder="Start Time"/>
                <br/>
                <input type="datetime-local" name="end_time" defaultValue={event.end_time} placeholder="End Time"/>
                <br/>
                <input type="checkbox" name="is_private" defaultChecked={event.is_private}/> Private Event
                <br/>
                <input type="password" name="password" placeholder="Password (if private)"/>
                <br/>
                <button type="submit">Update Event</button>
            </form>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>

            
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
}
export default EventDetails;