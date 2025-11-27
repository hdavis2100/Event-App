import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getEvents } from '../api.js';
import { useNavigate } from 'react-router-dom';

function EventsPage({user}) {

    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const date = searchParams.get('date');
    const description = searchParams.get('description');
    
    
    useEffect(() => {
        getEvents({date, description}).then(data => {
            if (data.success){
                setEvents(data.events);
                setEventsLoading(false);
            }
        });
    }, [date, description]);

    function handleSearch(event) {
        event.preventDefault();
        let date = event.target.date.value;
        let description = event.target.description.value;
        const params = new URLSearchParams();
       
        if (date) params.append('date', date);
        if (description) params.append('description', description);
        navigate(`/events?${params.toString()}`);
    }

    return (
        <div>

            <form onSubmit={handleSearch}>
                <label>
                    Date:
                    <input type="date" name="date" defaultValue={date} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" defaultValue={description} />
                </label>
                <button type="submit">Search</button>
            </form>
            


            <h2>Events</h2>

            <ul>
                {events.map(event => (
                    <li>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                        <p>{event.title}</p>
                        <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
                        <p>End Time: {new Date(event.end_time).toLocaleString()}</p>
                        <p>Host: <Link to={`/conversations/${event.planner.id}`}>{event.planner.name}</Link></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default EventsPage;