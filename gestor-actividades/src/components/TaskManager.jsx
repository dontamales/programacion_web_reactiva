import { useState, useEffect } from 'react'
import { getTasksFromStorage, setTasksToStorage } from '../utils/storage'
import FileHandler from './FileHandler'

function TaskManager({ username }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setTasks(getTasksFromStorage(username))
  }, [username])

  useEffect(() => {
    setTasksToStorage(username, tasks)
  }, [tasks, username])

  const addTask = () => {
    if (!input.trim()) {
      setError('La tarea no puede estar vacía')
      return
    }
    setTasks([...tasks, { text: input, done: false }])
    setInput('')
    setError('')
  }

  const toggleTask = idx => {
    setTasks(tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t))
  }

  const deleteTask = idx => {
    setTasks(tasks.filter((_, i) => i !== idx))
    setError('')
  }

  const startEdit = idx => {
    setEditIndex(idx)
    setEditValue(tasks[idx].text)
    setError('')
  }

  const saveEdit = idx => {
    if (!editValue.trim()) {
      setError('La tarea editada no puede estar vacía')
      return
    }
    setTasks(tasks.map((t, i) => i === idx ? { ...t, text: editValue } : t))
    setEditIndex(null)
    setEditValue('')
    setError('')
  }

  const cancelEdit = () => {
    setEditIndex(null)
    setEditValue('')
    setError('')
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Tus tareas</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nueva tarea"
          style={{ flex: 1 }}
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task, idx) => (
          <li key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6,
            background: '#f5f7fa',
            borderRadius: 5,
            padding: '4px 8px'
          }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(idx)}
              style={{ accentColor: '#1976d2' }}
            />
            {editIndex === idx ? (
              <>
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEdit(idx)}>Guardar</button>
                <button onClick={cancelEdit} style={{ background: '#aaa' }}>Cancelar</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    flex: 1,
                    textDecoration: task.done ? 'line-through' : 'none',
                    color: task.done ? '#888' : '#111'
                  }}
                >
                  {task.text}
                </span>
                <button onClick={() => startEdit(idx)}>Editar</button>
                <button onClick={() => deleteTask(idx)} style={{ background: '#e53935' }}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <FileHandler username={username} setTasks={setTasks} />
    </div>
  )
}

export default TaskManager