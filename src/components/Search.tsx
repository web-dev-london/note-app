import { Container, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const Search = (props: {
    // searchNote: string;
    handleSearchNote: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <>
            <Container
                maxW="container.lg"
                py={5}
            >
                <InputGroup>
                    <InputLeftElement>
                        <CiSearch />
                    </InputLeftElement>
                    <Input
                        onChange={props.handleSearchNote}
                        _focus={{ boxShadow: 'none' }}
                        placeholder="Search notes..."
                    />
                </InputGroup>
            </Container>
        </>
    )
}

export default Search;