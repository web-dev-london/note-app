import { nanoid } from 'nanoid';
import { useState } from 'react';
import NodeList from './components/NodeList';
import Search from './components/Search';
import { note, Note, noteArraySchema } from './utils/validateNote';





function App() {
    const [notes, setNote] = useState<Note>(note);
    const [searchNote, setSearchNote] = useState('');


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
        const newNote = {
            id: nanoid(),
            title: title,
            content: note,
            created: new Date(),
            updated: new Date(),
        }
        noteArraySchema.parse([newNote, ...notes])
        setNote([...notes, newNote])
    }

    // const addTitle = (title: string) => {
    //     const newTitle = {
    //         id: nanoid(),
    //         title: title,
    //         content: 'Content',
    //         created: new Date(),
    //         updated: new Date(),
    //     }
    //     noteArraySchema.parse([newTitle, ...notes])
    //     setNote([...notes, newTitle])
    // }


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
                // addTitle={addTitle}
                addNote={addNote}
                deleteNote={deleteNote}
                handleChange={handleChange}
            />
            <pre>{JSON.stringify(notes, null, 2)}</pre>
        </>
    )
}

export default App
