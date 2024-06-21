import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    HStack,
    Input,
    Text,
    Textarea
} from "@chakra-ui/react";
import { useState } from "react";


const AddNote = (props: {
    addNote: (title: string, note: string) => void;
    // addTitle: (title: string) => void;
}
) => {
    const [noteText, setNoteText] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const characterLimit = 300;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (characterLimit - event.target.value.length >= 0)
            setNoteText(event.target.value)
    }

    const hanldeSaveNote = () => {
        if (noteText.trim().length > 0)
            props.addNote(noteTitle, noteText)
        setNoteText('')
        setNoteTitle('')
    }


    return (
        <>
            <Card>
                <CardHeader
                    pb={0}
                >
                    <Heading size="md">Add title:</Heading>
                    <Input
                        value={noteTitle}
                        onChange={(event) => setNoteTitle(event.target.value)}
                        placeholder="Note title..."
                        _focus={{ boxShadow: 'none' }}
                        border={'none'}
                    />
                </CardHeader>
                <CardBody>
                    <Textarea
                        value={noteText}
                        onChange={handleChange}
                        _focus={{ boxShadow: 'none' }}
                        border={'none'}
                        rows={8}
                        cols={10}
                        resize={'none'}
                        placeholder="Type to add a note..."
                        maxW={'100%'}
                        minH={'300px'}
                    >
                    </Textarea>
                </CardBody>
                <CardFooter
                    pt={0}
                >
                    <HStack w={'100%'} >
                        <Text>
                            Character Limit: {characterLimit - noteText.length}
                        </Text>
                        <Button
                            onClick={hanldeSaveNote}
                            ml={'auto'}
                        >
                            Add
                        </Button>
                    </HStack>
                </CardFooter>
            </Card>
        </>
    )
}

export default AddNote