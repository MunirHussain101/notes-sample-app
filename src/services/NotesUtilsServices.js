const storageKey = 'notes-app-storage-key'

export const getNotesFromStorage = () => {
  const items = localStorage.getItem(storageKey)
  return items ? JSON.parse(items) : []
}

export const saveNotesIntoStorage = (list) => {
  localStorage.setItem(storageKey, JSON.stringify(list))
}

export const getRandomId = () => {
  return Math.round(Math.random() * 1000)
}

export const saveSelectedNotesIntoStorage = (updatedNote, isAddMode) => {
  let notes = getNotesFromStorage()

  // Add new note
  if(isAddMode) {
    notes.push(updatedNote)
    saveNotesIntoStorage(notes)
    return
  }

  // Update note
  notes = notes.map((note) => {
    if (+note.id === +updatedNote.id) {
      note = { ...updatedNote}
    }
    return note
  })
  saveNotesIntoStorage(notes)
}

export const getNoteById = (noteId) => {
  const items = localStorage.getItem(storageKey)
  const list  = items ? JSON.parse(items) : []
  const isItemExist = list.find((item) => +item.id === +noteId)
  return isItemExist || null
}

export const generateRandomColor = () => {
  const red = Math.floor(Math.random() * 255)
  const green = Math.floor(Math.random() * 255)
  const blue = Math.floor(Math.random() * 255)
  const opacity = 0.5
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

export const searchNotesFromStorage = (searchStr) => {
  let notes = getNotesFromStorage()
  let results = []

  if (!notes.length) return results

  notes.forEach(note => {
    if (note.title.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) {
      results.push(note)
    }
  });

  return results
}