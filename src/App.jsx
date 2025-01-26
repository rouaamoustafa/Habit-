import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Health from './pages/Salary'
import Tasks from './pages/Tasks'
import Habit from './pages/Habit'
import Settings from './pages/Settings'
import translations from './pages/translation'
import StickyNote from "./components/sticky_note";
import Calorie from './pages/Calorie'

function App() {

  const [isOpen ,setIsOpen] = useState(true);  
  const toggle =() => setIsOpen(!isOpen);

  const [direction, setDirection] = useState('ltr');
  console.log(direction);
  
  const [notes, setNotes] = useState([]);
  const addNote = () => {
    setNotes([
      ...notes,
      {
        id: Date.now(),
      },
    ]);
  };
  const removeNote = (noteId) => {
    setNotes(notes.filter((item) => item.id !== noteId));
  };

  return (
   <div dir={direction}>
    {/* <Settings setDirection={setDirection} /> */}
    <Header toggleSideBar={toggle} direction={direction} translations={translations}/>
     <BrowserRouter>
      <Sidebar isOpenSidebar={isOpen} direction={direction} translations={translations} addNote={addNote}>
       <Routes> 
            <Route
              path="/"
              element={<Tasks direction={direction} translations={translations} />}
            />
            <Route
              path="/tasks"
              element={<Tasks direction={direction} translations={translations} />}
            />
            <Route path="/habit" element={<Habit direction={direction} translations={translations}/>} />
         <Route path="/calorie" element={<Calorie direction={direction} translations={translations}/>} />
         <Route path="/settings" element={<Settings direction={direction} setDirection={setDirection} />} />
       </Routes>
       {/* Display Sticky Notes */}
       <div className="sticky-notes">
            {notes.map((item) => (
              <StickyNote key={item.id} onClose={() => removeNote(item.id)} direction={direction} translations={translations}/>
            ))}
          </div>
      </Sidebar>
     </BrowserRouter>
   </div>
  )
}

export default App
