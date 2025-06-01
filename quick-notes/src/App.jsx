import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    // Cargar las notas desde localStorage al inicializar el estado
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [note, setNote] = useState('');

  // Guardar las notas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() !== '') {
      const newNote = { id: Date.now(), content: note };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNote(''); // Limpiar el campo de entrada
    }
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Notas Rápidas</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Escribe tu nota aquí..."
        style={{
          width: '300px',
          height: '100px',
          marginBottom: '20px',
          padding: '10px',
          fontSize: '16px',
        }}
      />
      <br />
      <button
        onClick={addNote}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Agregar Nota
      </button>
      <h3 style={{ marginTop: '20px' }}>Total de Notas: {notes.length}</h3>
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          maxWidth: '400px',
          margin: '20px auto',
          textAlign: 'left',
        }}
      >
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              color: '#333',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f7f7f7',
            }}
          >
            <p style={{ margin: 0 }}>{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                cursor: 'pointer',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div style={{
        textAlign: "center",
        marginTop: "45px",
        fontSize: "20px",
      }}>Hinojo López Jesús Eduardo - 21111119</div>
    </div>
  );
}

export default App;
