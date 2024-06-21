import { Container, Grid, GridItem } from "@chakra-ui/react"
import { Note } from "../utils/validateNote"
import NodeView from "./NodeView"
import AddNote from "./AddNote"

const NodeList = (props: {
    notes: Note;
    // addTitle: (title: string) => void;
    addNote: (title: string, note: string) => void;
    deleteNote: (id: string) => void;
    handleChange: (noteId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {

    const cardNode = props.notes.map((note) => {

        return (
            <GridItem
                key={note.id}
            >
                <NodeView
                    deleteNote={props.deleteNote}
                    title={note.title}
                    content={note.content}
                    created={note.created}
                    id={note.id}
                    handleChange={props.handleChange}
                />
            </GridItem>
        )
    })
    return (
        <>
            <Container
                maxW="container.lg"
                py={5}
            >
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={4}
                >
                    {cardNode}
                    <AddNote
                        addNote={props.addNote}
                    />
                </Grid>
            </Container>
        </>
    )
}

export default NodeList