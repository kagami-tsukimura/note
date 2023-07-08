/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes')) || []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    notes.length > 0 && setActiveNote(notes[0].id);
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: '',
      content: '',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
  };

  return (
    <>
      <div className='App'>
        <Sidebar
          onAddNote={onAddNote}
          notes={notes}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </>
  );
}

export default App;
