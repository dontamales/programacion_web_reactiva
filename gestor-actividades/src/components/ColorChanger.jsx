import { useEffect, useRef, useState } from 'react'

const colors = ['#f0f0f0', '#ffe4e1', '#e0ffe1', '#e1e7ff', '#fffbe1', '#e0f7fa', '#f3e5f5']

function ColorChanger({ setBgColor }) {
  const [auto, setAuto] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (auto) {
      startAutoChange()
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line
  }, [auto])

  const startAutoChange = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setBgColor(colors[Math.floor(Math.random() * colors.length)])
    }, 4000)
  }

  const handleManualChange = () => {
    setBgColor(colors[Math.floor(Math.random() * colors.length)])
    setAuto(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 10 }}>
      <button onClick={handleManualChange} style={{ width: 220 }}>Cambiar color de fondo</button>
      <button
        onClick={() => setAuto(a => !a)}
        style={{
          width: 220,
          background: auto ? '#43a047' : '#1976d2',
          marginTop: 2
        }}
      >
        {auto ? 'Pausar automático' : 'Reanudar automático'}
      </button>
    </div>
  )
}

export default ColorChanger