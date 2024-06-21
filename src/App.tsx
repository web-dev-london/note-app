import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import NodeList from './components/NodeList';
import Search from './components/Search';
import { note, Note, noteArraySchema } from './utils/validateNote';


function App() {
    const [notes, setNote] = useState<Note>(
        !localStorage.getItem('note-app')
            ? note
            : noteArraySchema.parse(JSON.parse(localStorage.getItem('note-app') as string))
    );
    const [searchNote, setSearchNote] = useState('');


    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('note-app') as string) as Note;
        if (storedNotes) {
            setNote(storedNotes)
        }
    }, [])

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
