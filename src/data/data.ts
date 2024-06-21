import { nanoid } from "nanoid"

export const notes = [{
    id: nanoid(),
    title: 'Note 1',
    content: 'Content 1',
    created: new Date(),
}, {
    id: nanoid(),
    title: 'Note 2',
    content: 'Content 2',
    created: new Date(),
}
]