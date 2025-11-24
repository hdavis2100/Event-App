import { useEffect, useState } from 'react';
import { getPlannerInfo, addEvent, updateEvent, deleteEvent, getEventRegistrations} from '../api.js';

function PlannerDashboard() {

    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [regEventId, setRegEventId] = useState(null);

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

    useEffect(() => {
        setRegEventId(null);
        setRegistrations([]);
    }, []);

    useEffect(() => {
        if (regEventId !== null) {
            getEventRegistrations(regEventId).then(data => {
                if (data.success){
                    setRegistrations(data.registrations);
                }
                else {
                    alert('Failed to fetch event registrations: ' + data.message);
                }
            });
        }
    }, [regEventId]);


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

    function showRegistrations(eventId) {
        setRegEventId(eventId);
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
                    <li key={event.id}>
                        <h3> {event.title} </h3>
                        {event.is_private && <span>(Private Event)</span>}

                        {event.description && <p> {event.description} </p>}

                        <p> <strong>Location:</strong> {event.location} </p>
                        <p> <strong> Starts:</strong> {event.start_time ? new Date(event.start_time).toLocaleString() : 'N/A'} </p>
                        <p> <strong> Ends:</strong> {event.end_time ? new Date(event.end_time).toLocaleString() : 'N/A'} </p>
                        <form id={`edit-form-${event.id}`} onSubmit={(e) => handleEditEvent(event.id, e)} hidden={true}>
                            <input type="text" name="title" defaultValue={event.title} placeholder="Event Title"/>
                            <br/>
                            <textarea name="description" defaultValue={event.description} placeholder="Event Description"></textarea>
                            <br/>
                            <input type="text" name="location" defaultValue={event.location} placeholder="Event Location"/>
                            <br/>
                            <input type="datetime-local" name="start_time" defaultValue={event.start_time ? event.start_time.slice(0,16) : ''} placeholder="Start Time"/>
                            <br/>
                            <input type="datetime-local" name="end_time" defaultValue={event.end_time ? event.end_time.slice(0,16) : ''} placeholder="End Time"/>
                            <br/>
                            <input type="checkbox" name="is_private" defaultChecked={event.is_private}/> Private Event
                            <br/>
                            <input type="password" name="password" placeholder="Event Password (if private)"/>
                            <br/>
                            <button type="submit"> Update Event </button>
                        </form>
                        <button onClick={(e) => {
                            const form = document.getElementById(`edit-form-${event.id}`);
                            form.hidden = !form.hidden;
                        }}> Edit Event </button>

                        <button onClick={() => handleDeleteEvent(event.id)}> Delete Event </button>
                        <button onClick={() => showRegistrations(event.id)}> View Registrations </button>
                        {regEventId === event.id && (
                            <ul>
                            <h4> Registrations for {event.title}: </h4>
                            {registrations.length === 0 ? (
                                <p>No registrations yet.</p>
                            ) : (
                                registrations.map(reg => (
                                    <li key={reg.id}>
                                        <p> Name: {reg.name} </p>
                                    </li>
                                ))
                            )}
                            </ul>
                            
                        )}



                    </li>

                ))}
            </ul>
            )}
        </div>
    </div>
    );

}

export default PlannerDashboard;