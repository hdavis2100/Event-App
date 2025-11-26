import { useEffect, useState } from 'react';
import { getPlannerInfo, addEvent, updateEvent, deleteEvent, getEventRegistrations} from '../api.js';

function PlannerDashboard() {

    const [events, setEvents] = useState([]);
    

    function loadEvents() {
        getPlannerInfo().then(data => {
            if (data.success){
                setEvents(data.events);
            }
            else {
                alert('Failed to fetch planner events: ' + data.message);
            }
        });
    }

    
    useEffect(() => {
        loadEvents();
    }, []);


    


    function handleCreateEvent(e) {
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

        addEvent(data).then(response => {
            if (!response.success) {
                alert('Failed to add event: ' + response.message);
            }
            loadEvents();
            
        });
    }

    function handleDeleteEvent(eventId) {
        deleteEvent(eventId).then(response => {
            if (!response.success) {
                alert('Failed to delete event: ' + response.message);
            }
            loadEvents();
        });
    }

    
    
    
    return (
        <div>
        <div>
            <h2> Create New Event: </h2>
            <form onSubmit={handleCreateEvent}>
                <input type="text" name="title" placeholder="Event Title"/>
                <br/>
                <textarea name="description" placeholder="Event Description"></textarea>
                <br/>
                <input type="text" name="location" placeholder="Event Location"/>
                <br/>
                <input type="datetime-local" name="start_time" placeholder="Start Time"/>
                <br/>
                <input type="datetime-local" name="end_time" placeholder="End Time"/>
                <br/>
                <input type="checkbox" name="is_private"/> Private Event
                <br/>
                <input type="password" name="password" placeholder="Event Password (if private)"/>
                <br/>
                <button type="submit"> Create Event </button>
            </form>

        </div>
        <div>
            <h2> Planner Dashboard: </h2>
            <h3> Your Events: </h3>
            {events.length === 0 && <p>No events created yet.</p>}

            {events.length > 0 && (
            <ul>
                {events.map(event => (
                    <li >

                        <Link to={`/${event.id}`}> View Details </Link>
                        <h3> {event.title} </h3>
                        {event.is_private && <span>(Private Event)</span>}

                    </li>

                ))}
            </ul>
            )}
        </div>

    </div>
    );

}

export default PlannerDashboard;