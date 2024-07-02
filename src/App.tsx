import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import NodeList from './components/NodeList';
import Search from './components/Search';
import { parsedNotes, Note, noteArraySchema } from './utils/validateNote';


function App() {
    function initializeNotes() {
        const localNotes = localStorage.getItem('note-app')
        if (localNotes) {
            const notes = JSON.parse(localNotes)
            return noteArraySchema.parse(notes)
        } else {
            return parsedNotes
        }
    }

    const [notes, setNote] = useState<Note>(initializeNotes);
    const [searchNote, setSearchNote] = useState('');

    useEffect(() => {
        localStorage.setItem('note-app', JSON.stringify(notes))
    }, [notes])


    const handleSearchNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchNote(event.target.value)
    }

    const characterLimit = 300;
    const handleChange = (noteId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(notes.map((note) => {
            if (note.id === noteId) {
                if ((characterLimit - event.target.value.length >= 0)) {
                    return {
                        ...note,
                        content: event.target.value
                    }
                }
            }
            return note
        }))
    }


    const addNote = (title: string, note: string) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            title: title,
            content: note,
            created: date.toLocaleDateString("en-GB"),
        }
        noteArraySchema.parse([newNote, ...notes])
        setNote([...notes, newNote])
    }


    const deleteNote = (id: string) => {
        const newNotes = notes.filter((note) => note.id !== id)
        setNote(newNotes)
    }


    return (
        <>
            <Search
                handleSearchNote={handleSearchNote}
            />
            <NodeList
                notes={notes.filter((note) => {
                    return note.title.toLowerCase().includes(searchNote.toLowerCase())
                })}
                addNote={addNote}
                deleteNote={deleteNote}
                handleChange={handleChange}
            />
            <pre>{JSON.stringify(notes, null, 2)}</pre>
        </>
    )
}

export default App
