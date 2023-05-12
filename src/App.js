import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AddNotesPage from './pages/AddNotesPage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />}></Route>
      <Route path="/note/:noteId" element={<AddNotesPage />}></Route>
      <Route path="*" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
