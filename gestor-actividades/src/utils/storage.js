export function getUserFromStorage() {
  return localStorage.getItem('user') || null
}

export function setUserToStorage(user) {
  if (user) {
    localStorage.setItem('user', user)
  } else {
    localStorage.removeItem('user')
  }
}

export function getTasksFromStorage(username) {
  const data = localStorage.getItem(`tasks_${username}`)
  return data ? JSON.parse(data) : []
}

export function setTasksToStorage(username, tasks) {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks))
}