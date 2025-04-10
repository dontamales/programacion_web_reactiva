import { useState } from 'react';

function EventItem({ event, updateEvent, deleteEvent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateEvent(editedEvent);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="location"
            value={editedEvent.location}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            value={editedEvent.description}
            onChange={handleEditChange}
          ></textarea>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h3>{event.title}</h3>
          <p>Fecha: {event.date}</p>
          <p>Lugar: {event.location}</p>
          <p>{event.description}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => deleteEvent(event.id)}>Eliminar</button>
        </div>
      )}
    </li>
  );
}

export default EventItem;