import { getTasksFromStorage, setTasksToStorage } from '../utils/storage'
import { useRef } from 'react'

function FileHandler({ username, setTasks }) {
  const fileInputRef = useRef(null)

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = evt => {
      const lines = evt.target.result.split('\n')
      const tasks = lines
        .map(line => {
          const match = line.match(/^\[(x| )\] (.+)$/)
          if (!match) return null
          return { done: match[1] === 'x', text: match[2] }
        })
        .filter(Boolean)
      setTasksToStorage(username, tasks)
      setTasks(tasks) // Actualiza el estado en TaskManager
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleExport = () => {
    const tasks = getTasksFromStorage(username)
    const content = tasks.map(t => `${t.done ? '[x]' : '[ ]'} ${t.text}`).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tareas.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button onClick={handleExport}>Exportar tareas (.txt)</button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleImport}
        style={{ marginTop: 4 }}
      />
    </div>
  )
}

export default FileHandler