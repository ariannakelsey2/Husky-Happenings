import React, { useEffect, useState } from "react";
import { fetchEvents, createEvent } from "../../api";
import CreateEventForm from "./CreateEventForm";
import EventList from "./EventList";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    privacyType: "Public",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await fetchEvents();
    if (Array.isArray(data)) {
      setEvents(data);
    } else {
      setEvents([]);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const result = await createEvent(formData);

    if (result.error) {
      setMessage(result.error);
      return;
    }

    setMessage("Event created successfully.");
    setFormData({
      title: "",
      description: "",
      location: "",
      startDateTime: "",
      endDateTime: "",
      privacyType: "Public",
    });

    loadEvents();
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Events</h1>
        <p>Create and view upcoming events.</p>
      </div>

      <section className="events-section">
        <h2>Create Event</h2>
        <CreateEventForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {message && <p className="events-message">{message}</p>}
      </section>

      <section className="events-section">
        <div className="events-list-header">
          <h2>Upcoming Events</h2>
          <button type="button" onClick={loadEvents} className="refresh-button">
            Refresh
          </button>
        </div>
        <EventList events={events} />
      </section>
    </div>
  );
}
