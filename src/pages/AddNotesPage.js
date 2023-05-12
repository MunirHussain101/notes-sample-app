import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getNoteById, getRandomId, saveSelectedNotesIntoStorage } from "../services/NotesUtilsServices";

const AddNotesPage = () => {
  
  let { noteId } = useParams()
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const [isAddMode, setFormMode] = useState(true)
  const [isViewMode, setViewMode] = useState(false)
  const [saveNotesCIP, setSaveNotesCIP] = useState(false)
  const [formModel, setFormModel] = useState({
    title: '',
    description: ''
  })
  
  /**
   * Desc: Check route for notes id, if exist then Edit mode else add mode 
   */
  useEffect(() => {
    setFormMode(!!!+noteId)
    setViewMode(searchParams.get('mode'))
    if (+noteId) {
      const notes = getNoteById(+noteId)
      setFormModel(notes)
    }

  }, [])

  const submitForm = (e) => {
    if (e) {
      e.preventDefault();
    }
    // Since we kept title required field
    if (!formModel.title) return
    
    setSaveNotesCIP(true)
    let notesParams = isAddMode ? 
      { id: getRandomId(), ...formModel } 
      : 
      { ...formModel}

    saveSelectedNotesIntoStorage(notesParams, isAddMode)

    setTimeout(() => {
      setSaveNotesCIP(false)
      redirectToHome()
    }, 1000)
  }

  const onFieldChange = (e, field) => {
    if (!e) return

    let formData = { ...formModel}

    formData[field] = e.target.value
    setFormModel(formData)
  }

  const redirectToHome = () => {
    navigate('/')
  }

  const navigateToEditMode = () => {
    setViewMode(false)
    navigate(`/note/${noteId}`)
  }

  const getModeDetails = () => {
    if(isViewMode) {
      return 'View'
    }
    return isAddMode ? 'Add' : 'Edit'
  }

  return (
    <div className="notes-app-container">
      <div className="centerlize">
        <h1>{ getModeDetails() } Notes</h1>
        <form onSubmit={submitForm}>
          {/* title container */}
          <div className="field-container item-border shadow">
            <input 
              className="input-field" 
              type="text" 
              value={formModel.title} 
              placeholder="Notes Title *" 
              onChange={(e) => onFieldChange(e, 'title')}
              disabled={isViewMode}
            />
          </div>

          {/* description container */}
          <div className="field-container item-border shadow">
            <textarea 
              className="input-field" 
              value={formModel.description}  
              placeholder="Notes Description"
              onChange={(e) => onFieldChange(e, 'description')}
              disabled={isViewMode}
            />
          </div>

          { isViewMode && 
            <div className="action-container">
              <button 
                className="action-field"
                type="button"
                onClick={() => navigateToEditMode()}
              >
              Edit Form
              </button>
            </div>
          }

          { !isViewMode && 
            <div className="action-container">
              { saveNotesCIP ?
                <span className="loader"></span> :
                <button 
                  disabled={!formModel.title} 
                  className={`action-field ${!formModel.title && 'action-field-disabled'}`}
                  type="submit"
                >
                Save
                </button>
              }
            </div>
          }
          
        </form>
      </div>
      
    </div>
  );
}

export default AddNotesPage;
