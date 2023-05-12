import { useEffect, useState } from "react";
import { getNotesFromStorage, generateRandomColor, saveNotesIntoStorage, searchNotesFromStorage } from "../services/NotesUtilsServices";
import { AiOutlinePlus, AiTwotoneDelete, AiFillEdit, AiTwotoneEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllNotes()
  }, [])

  const getAllNotes = () => {
    const allNotes = getNotesFromStorage()
    setNotes(allNotes)
  }

  const getRandomBgColor= () => {
    return {background: generateRandomColor()}
  }

  const moveToAddNotes = (noteId = 0) => {
    navigate(`/note/${noteId}`)
  }
  const moveToViewNotes = (noteId = 0) => {
    navigate(`/note/${noteId}?mode=1`)
  }

  const deleteNotes = (noteId = 0) => {
    if (!noteId) return
    const updNotes = notes.filter((note) => +note.id !== noteId)
    setNotes(updNotes)
    saveNotesIntoStorage(updNotes)
  }

  const searchNotes = (searchStr = '') => {
    if (!searchStr) {
      getAllNotes()
    }

     const notes = searchNotesFromStorage(searchStr)
     setNotes(notes)
  }

  return (
    <div className="notes-app-container centerlize">
      <div className="notes-list-container">
        <div className="notes-heading-container">
          <h2>Sticky Notes</h2>
          <AiOutlinePlus style={{fontSize: 20}} onClick={() => moveToAddNotes()}/>
        </div>

        <div>
          <SearchBar searchString={(value) => searchNotes(value)}/>
        </div>
        
        { notes && notes.length > 0 && notes.map((note, index) => {
            return <div style={getRandomBgColor()} key={index} className="item-border notes-list-item-container shadow">
              <div className="align-right-corner">
                <AiTwotoneEye style={{marginRight: 10}} onClick={() => moveToViewNotes(note.id)}/>
                <AiFillEdit style={{marginRight: 10}} onClick={() => moveToAddNotes(note.id)}/>
                <AiTwotoneDelete onClick={() => deleteNotes(note.id)}/>
              </div>
              <h4 className="notes-title text-ellipsis">{note.title}</h4>
              <div className="notes-description text-ellipsis--2">{note.description}</div>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default HomePage;
