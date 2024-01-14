import {Flex, IconButton, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {useEventStore} from "../../store/useEventStore.ts";
import {useDebounce} from "@uidotdev/usehooks";
import React from "react";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";

export const SearchBar = () => {
    const storeKeyword = useEventStore(state => state.keyword);
    const [keyword, setKeyword] = React.useState(storeKeyword);
    const setStoreKeyword = useEventStore(state => state.setKeyword);

    const debouncedKeyword = useDebounce(keyword, 500);

    React.useEffect(() => {
        setStoreKeyword(debouncedKeyword);
    }, [debouncedKeyword, setStoreKeyword]);

    React.useEffect(() => {
        setKeyword(storeKeyword);
    }, [storeKeyword]);

    return (
        <Flex pt={4} px={4}>
            <IconButton borderRadius="full" colorScheme="blue" aria-label="Search database" icon={<AddIcon />} mr={2} />

            <InputGroup size="md">
                <Input
                    borderRadius="full"
                    boxShadow="md"
                    variant="filled"
                    textAlign="center"
                    placeholder="尋找活動"
                    bgColor="white"
                    value={keyword}
                    onChange={({target: {value}}) => setKeyword(value)}
                />
                <InputRightElement>
                    <IconButton onClick={() => setStoreKeyword("")} colorScheme="blue" size="sm" borderRadius="full" aria-label="clear" icon={<CloseIcon />} />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};
