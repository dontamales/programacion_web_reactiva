import { useState, useEffect } from 'react';
import './App.css';
import './styles/styles.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState(() => {
    // Cargar eventos desde localStorage al iniciar
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    // Guardar eventos en localStorage cada vez que cambien
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="App">
      <h1>Registro de Eventos</h1>
      <EventForm addEvent={addEvent} />
      <EventList
        events={events}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
    </div>
  );
}

export default App;
