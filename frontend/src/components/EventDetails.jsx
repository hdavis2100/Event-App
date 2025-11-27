import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

import { updateEvent, deleteEvent, getEventById, getEventRegistrations, getEventComments} from '../api.js';

function EventDetails() {

    const [event, setEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [comments, setComments] = useState([]);
    const { eventId } = useParams();  
    const [isLoading, setIsLoading] = useState(true);
    const [regLoading, setRegLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);
    let navigate = useNavigate();
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
                    setRegLoading(false);
                });
                
                getEventComments(eventId).then(commentData => {
                    if (commentData.success) {
                        setComments(commentData.eventComments);  
                    }
                    else {
                        alert('Failed to fetch event comments: ' + commentData.message);
                    }
                    setCommentLoading(false);
                });
                
                setEvent(data.event);
                setIsLoading(false);
                

            } else {
                alert('Failed to fetch event details: ' + data.message);
            }
        
        });
    }, []);
    if (isLoading || regLoading || commentLoading) {
        return <div>Loading...</div>;
    }
    if (!event) {
        return <div>Loading...</div>;
    }

    function handleEditEvent(eventId, e) {
        e.preventDefault();

        if (!e.target.is_private.checked && (!e.target.password || e.target.password.value.length === 0)){
            e.target.password.value = "none";
        }
        

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
            else {
                navigate('/');
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
                    <li>{reg.user.name }</li>
                ))}
            </ul>
            <ul>
                {comments.map(comment => (
                    <li>{comment.user.name}: {comment.message}</li>
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