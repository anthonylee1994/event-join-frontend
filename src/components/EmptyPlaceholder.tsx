import {Flex, Text} from "@chakra-ui/react";
import {InfoIcon} from "@chakra-ui/icons";

export const EmptyPlaceholder = () => {
    return (
        <Flex w="full" height="calc(100% - 40px)" position="fixed" justifyContent="center" alignItems="center" flexDirection="column" color="blue.500">
            <InfoIcon fontSize="5xl" mb={2} />
            <Text>沒有相關活動</Text>
        </Flex>
    );
};
