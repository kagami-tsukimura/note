/* eslint-disable react/prop-types */
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import './Sidebar.css';

const Sidebar = ({
  onAddNote,
  notes,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedDescNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>Note</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className='app-sidebar-notes'>
        {sortedDescNotes.map((note) => {
          return (
            <div
              className={`app-sidebar-note ${
                note.id === activeNote && 'active'
              }`}
              key={note.id}
              onClick={() => setActiveNote(note.id)}
            >
              <div className='app-sidebar-note-title'>
                <strong>{note.title}</strong>
                <button onClick={() => onDeleteNote(note.id)}>Delete</button>
              </div>
              <ReactMarkdown>{note.content}</ReactMarkdown>
              <small>
                {new Date(note.modDate).toLocaleDateString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
