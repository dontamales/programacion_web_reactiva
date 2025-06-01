import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import TaskManager from './components/TaskManager'
import ColorChanger from './components/ColorChanger'
import { getUserFromStorage, setUserToStorage } from './utils/storage'

function App() {
  const [user, setUser] = useState(getUserFromStorage())
  const [bgColor, setBgColor] = useState('#f0f0f0')

  useEffect(() => {
    document.body.style.background = bgColor
  }, [bgColor])

  const handleLogin = (username) => {
    setUser(username)
    setUserToStorage(username)
  }

  const handleLogout = () => {
    setUser(null)
    setUserToStorage(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: bgColor,
    }}>
      <div style={{
        background: '#fff',
        color: '#111',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '36px 28px',
        minWidth: 340,
        maxWidth: 420,
        width: '100%',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        {!user ? (
          <>
            <Login onLogin={handleLogin} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
              <ColorChanger setBgColor={setBgColor} />
            </div>
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
              gap: 10,
            }}>
              <h2 style={{ margin: 0, color: '#111', fontWeight: 700, fontSize: 26 }}>Bienvenido, {user}</h2>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <div style={{ margin: '0 0 10px 0' }}>
              <TaskManager username={user} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
              <ColorChanger setBgColor={setBgColor} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
