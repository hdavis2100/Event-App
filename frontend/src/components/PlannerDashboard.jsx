import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlannerInfo, addEvent } from '../api.js';

function PlannerDashboard() {
  const [events, setEvents] = useState([]);

  function loadEvents() {
    getPlannerInfo().then((data) => {
      if (data.success) {
        setEvents(data.events || []);
      } else {
        alert('Failed to fetch planner events: ' + data.message);
      }
    });
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleCreateEvent(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const isPrivate = form.is_private.checked;
    const passwordValue = form.password.value.trim();

    if (isPrivate && !passwordValue) {
      alert('Private events must have a password.');
      return;
    }

    const payload = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      start_time: form.start_time.value,
      end_time: form.end_time.value,
      is_private: isPrivate,
      password: isPrivate ? passwordValue : 'none',
    };

    addEvent(payload).then((response) => {
      if (!response.success) {
        alert('Failed to add event: ' + response.message);
      } else {
        form.reset();
        loadEvents();
      }
    });
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  return (
    <div className="page">
      <div className="page-grid">
        <section className="card">
          <div className="card__header">
            <h2 className="card__title">Create a new event</h2>
            <p className="card__meta">
              Define the basics, then share it with seekers.
            </p>
          </div>

          <form onSubmit={handleCreateEvent}>
            <label>
              Title
              <input
                type="text"
                name="title"
                placeholder="Team social, meetup, workshop..."
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                placeholder="What is this event about?"
                required
              />
            </label>
            <label>
              Location
              <input
                type="text"
                name="location"
                placeholder="Online / City, Venue"
                required
              />
            </label>
            <label>
              Start time
              <input type="datetime-local" name="start_time" required />
            </label>
            <label>
              End time
              <input type="datetime-local" name="end_time" required />
            </label>
            <label className="field--inline">
              <input type="checkbox" name="is_private" />
              <span>Private event (requires a password)</span>
            </label>
            <label>
              Password (only if private)
              <input
                type="password"
                name="password"
                placeholder="Enter a password for invite-only access"
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Create event
            </button>
          </form>
        </section>

        <section className="card card--subtle">
          <div className="card__header">
            <h2 className="card__title">Your events</h2>
            <p className="card__meta">
              {sortedEvents.length === 0
                ? 'No events created yet.'
                : `Showing ${sortedEvents.length} event${
                    sortedEvents.length > 1 ? 's' : ''
                  }`}
            </p>
          </div>

          {sortedEvents.length === 0 ? (
            <p className="text-muted">
              Start by creating your first event on the left. It will show up here
              once saved.
            </p>
          ) : (
            <ul className="list--events">
              {sortedEvents.map((event) => (
                <li key={event.id}>
                  <div className="event-row__main">
                    <h3>{event.title}</h3>
                    <p>
                      {new Date(event.start_time).toLocaleString()} –{' '}
                      {new Date(event.end_time).toLocaleString()}
                    </p>
                    <p className="text-muted">{event.location}</p>
                  </div>
                  <div className="event-row__meta">
                    {event.is_private && (
                      <span className="badge badge--private">Private</span>
                    )}
                    <Link className="btn btn-sm btn-ghost" to={`/${event.id}`}>
                      View details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default PlannerDashboard;
