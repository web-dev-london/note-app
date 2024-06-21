import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Heading, HStack, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { CiEdit, CiTrash, CiBookmarkCheck } from "react-icons/ci";


const NodeView = (props: {
    title: string;
    content: string;
    created: Date;
    id: string;
    deleteNote: (id: string) => void;
    handleChange: (noteId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const characterLimit = 300;

    let noteContent;
    if (isEditing) {
        noteContent =
            <Box
                as="div"
            >
                <Textarea
                    value={props.content}
                    onChange={props.handleChange.bind(null, props.id)}
                    _focus={{ boxShadow: 'none' }}
                    border={'none'}
                    minH={'300px'}
                    resize={'none'}
                    maxW={'100%'}
                >
                </Textarea>
                <Text
                    as={'span'}
                    fontSize={'14px'}
                >
                    Character Limit: {
                        characterLimit - props.content.length >= 0
                            ? characterLimit - props.content.length
                            : 0
                    }
                </Text>
            </Box>
    } else {
        noteContent = <Textarea
            isDisabled
            whiteSpace={'pre-wrap'}
            value={props.content}
            _focus={{ boxShadow: 'none' }}
            border={'none'}
            minH={'300px'}
            resize={'none'}
            maxW={'100%'}
        >
        </Textarea>
    }




    return (
        <>
            <Card
                variant={'outline'}
                minH={'400px'}
            >
                <CardHeader>
                    <Heading size="md">{props.title}</Heading>
                </CardHeader>
                <Divider />
                <CardBody
                    pb={0}
                >
                    {noteContent}
                </CardBody>
                <CardFooter>
                    <HStack
                        w={'100%'}
                    >
                        <Box>
                            <Text>Created:</Text>
                            <Text>{props.created.toLocaleString()}</Text>
                        </Box>
                        <ButtonGroup
                            ml={'auto'}
                        >
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                p={0}
                                variant={"ghost"}
                            >
                                {isEditing
                                    ? <CiBookmarkCheck
                                        size={'30px'} />
                                    : <CiEdit
                                        size={'30px'} />
                                }
                            </Button>
                            <Button
                                onClick={() => props.deleteNote(props.id)}
                                p={0}
                                variant={"ghost"}
                            >
                                <CiTrash
                                    size={'30px'} />
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </CardFooter>
            </Card>
        </>
    )
}

export default NodeView;