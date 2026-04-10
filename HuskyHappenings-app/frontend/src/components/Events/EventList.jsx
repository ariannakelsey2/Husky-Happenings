
import React from "react";

function formatDateTime(value) {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

export default function EventList({ events }) {
  if (!events || events.length === 0) {
    return <p className="empty-state">No events yet. Create one to get started.</p>;
  }

  return (
    <div className="event-card-grid">
      {events.map((event) => (
        <div className="event-card" key={event.id}>
          <div className="event-card-top">
            <h3>{event.title}</h3>
            <span className="event-badge">{event.privacyType}</span>
          </div>

          <p className="event-description">
            {event.description || "No description provided."}
          </p>

          <div className="event-meta">
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Starts:</strong> {formatDateTime(event.startDateTime)}</p>
            <p><strong>Ends:</strong> {formatDateTime(event.endDateTime)}</p>
            <p><strong>Status:</strong> {event.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
