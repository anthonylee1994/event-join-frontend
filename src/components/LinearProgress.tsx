import {Progress} from "@chakra-ui/react";

interface Props {
    isLoading: boolean;
}

export const LinearProgress = ({isLoading}: Props) => {
    return <Progress zIndex={2} position="fixed" top={0} size="xs" w="full" isIndeterminate visibility={isLoading ? undefined : "hidden"} />;
};
