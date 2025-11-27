import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSeekerInfo } from "../api.js";

function SeekerDashboard() {

    const [events, setEvents] = useState([]);


    useEffect(() => {
        getSeekerInfo().then(data => {
            if (data.success){
                setEvents(data.registeredEvents);
            }
            else {
                alert('Failed to fetch seeker events: ' + data.message);
            }
        });
    }, []);
    events.sort((a, b) => new Date(a.event_details.start_time) - new Date(b.event_details.start_time));
    return (
        <div>
            <h2>Your Events</h2>
            <ul>
                {events.map(event => (
                    <li>
                        <Link to={`/events/${event.event_details.id}`}>{event.event_details.title}</Link>
                        <p>Host: <Link to={`/conversations/${event.planner.id}`}>{event.planner.name}</Link></p>
                    </li>
                ))}
            </ul>
        </div>
    );


}
export default SeekerDashboard;