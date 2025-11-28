import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSeekerInfo } from '../api.js';

function SeekerDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getSeekerInfo().then((data) => {
      if (data.success) {
        setEvents(data.registeredEvents || []);
      } else {
        alert('Failed to fetch seeker events: ' + data.message);
      }
    });
  }, []);

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.event_details.start_time) -
      new Date(b.event_details.start_time)
  );

  return (
    <div className="page">
      <section className="card card--subtle">
        <div className="card__header">
          <h2 className="card__title">Your upcoming events</h2>
          <p className="card__meta">
            {sortedEvents.length === 0
              ? 'You are not registered for any events yet.'
              : `You are registered for ${sortedEvents.length} event${
                  sortedEvents.length > 1 ? 's' : ''
                }`}
          </p>
        </div>

        {sortedEvents.length === 0 ? (
          <p className="text-muted">
            Use the <strong>Events</strong> tab to discover and register for events.
          </p>
        ) : (
          <ul className="list--events">
            {sortedEvents.map((event) => (
              <li key={event.event_details.id}>
                <div className="event-row__main">
                  <h3>
                    <Link to={`/events/${event.event_details.id}`}>
                      {event.event_details.title}
                    </Link>
                  </h3>
                  <p>
                    {new Date(
                      event.event_details.start_time
                    ).toLocaleString()}{' '}
                    –{' '}
                    {new Date(
                      event.event_details.end_time
                    ).toLocaleString()}
                  </p>
                  <p className="text-muted">
                    {event.event_details.location}
                  </p>
                </div>
                <div className="event-row__meta">
                  <span className="text-muted">
                    Host{' '}
                    <Link to={`/conversations/${event.planner.id}`}>
                      {event.planner.name}
                    </Link>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default SeekerDashboard;
