import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";


const SearchBar = ({searchString}) => {
  const [saveNotesCIP, setSaveNotesCIP] = useState(false)
  const [formModel, setFormModel] = useState({
    title: '',
  })

  const onFieldChange = (e, field) => {
    if (!e) return

    let formData = { ...formModel}

    formData[field] = e.target.value
    setFormModel(formData)
  }

  const submitForm = (e) => {
    if (e) {
      e.preventDefault();
    }
    searchString(formModel.title)
  }
  

  return (
    <div>
      <form onSubmit={submitForm} style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <div className="field-container item-border" style={{marginRight: 10, marginBottom: 0}}>
          <input 
            className="input-field" 
            type="text" 
            value={formModel.title} 
            placeholder="Search Title" 
            onChange={(e) => onFieldChange(e, 'title')}
          />
        </div>
          
        <div className="action-container">
          <button 
            className="action-field"
            type="submit"
          >
          <AiOutlineSearch />
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default SearchBar;
