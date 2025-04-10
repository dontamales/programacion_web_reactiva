import EventItem from './EventItem';

function EventList({ events, updateEvent, deleteEvent }) {
  if (events.length === 0) {
    return <p>No hay eventos registrados.</p>;
  }

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}
          />
        ))}
      </ul>
    </div>
  );
}

export default EventList;