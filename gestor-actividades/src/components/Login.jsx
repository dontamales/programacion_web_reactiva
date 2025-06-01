import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    setError('')
    onLogin(username.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Tu nombre"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default Login