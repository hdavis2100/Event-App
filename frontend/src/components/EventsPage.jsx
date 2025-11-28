import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getEvents } from '../api.js';

function EventsPage({ user }) {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const navigate = useNavigate();

  const date = searchParams.get('date') || '';
  const search = searchParams.get('search') || '';
  const creator = searchParams.get('creator') || '';

  useEffect(() => {
    setEventsLoading(true);
    getEvents({ search, date, creator }).then((data) => {
      if (data.success) {
        setEvents(data.events || []);
      } else {
        alert('Failed to fetch events: ' + data.message);
        setEvents([]);
      }
      setEventsLoading(false);
    });
  }, [date, search, creator]);

  function handleSearch(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const dateValue = form.date.value;
    const searchValue = form.search.value;
    const creatorValue = form.creator.value;

    const params = new URLSearchParams();
    if (dateValue) params.set('date', dateValue);
    if (searchValue) params.set('search', searchValue);
    if (creatorValue) params.set('creator', creatorValue);

    navigate(`/events${params.toString() ? `?${params.toString()}` : ''}`);
  }

  const hasFilters = date || search || creator;

  return (
    <div className="page">
      <section className="card">
        <div className="card__header">
          <h2 className="card__title">Browse public events</h2>
          <p className="card__meta">
            Filter by date, description, or creator to find what you&apos;re
            looking for.
          </p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <label>
            Date
            <input type="date" name="date" defaultValue={date} />
          </label>
          <label>
            Description
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="e.g. networking, workshop, coffee chat..."
            />
          </label>
          <label>
            Creator
            <input
              type="text"
              name="creator"
              defaultValue={creator}
              placeholder="Planner name"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {hasFilters && (
          <p className="text-muted">
            Active filters:
            {date && <> date = {date}</>}
            {search && <> • description contains &quot;{search}&quot;</>}
            {creator && <> • creator contains &quot;{creator}&quot;</>}
          </p>
        )}
      </section>

      <section className="card card--subtle">
        <div className="card__header">
          <h2 className="card__title">Events</h2>
          <p className="card__meta">
            {eventsLoading
              ? 'Loading events...'
              : events.length === 0
              ? 'No events matched your filters.'
              : `Found ${events.length} event${
                  events.length > 1 ? 's' : ''
                }`}
          </p>
        </div>

        {eventsLoading ? (
          <p className="text-muted">Fetching events from the server...</p>
        ) : events.length === 0 ? (
          <p className="text-muted">
            Try clearing some filters or searching for a different keyword.
          </p>
        ) : (
          <ul className="list--events">
            {events.map((event) => (
              <li key={event.id}>
                <div className="event-row__main">
                  <h3>
                    <Link to={`/events/${event.id}`}>{event.title}</Link>
                  </h3>
                  <p>{event.description}</p>
                  <p>
                    {new Date(event.start_time).toLocaleString()} –{' '}
                    {new Date(event.end_time).toLocaleString()}
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

export default EventsPage;
