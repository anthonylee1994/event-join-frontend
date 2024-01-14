import {Event} from "../../types/event.ts";
import {AspectRatio, Box, Card, CardBody, CardFooter, Image, Tag} from "@chakra-ui/react";
import moment from "moment";
import {useEventStore} from "../../store/useEventStore.ts";

interface Props {
    event: Event;
}

export const EventCard = ({event}: Props) => {
    const setKeyword = useEventStore(state => state.setKeyword);

    return (
        <Card cursor="pointer" w="full" borderRadius="2xl" overflow="hidden" mb={2}>
            <AspectRatio ratio={16 / 9}>
                <Image w="full" src={event.photo_url} />
            </AspectRatio>
            <CardBody>
                <Box mb={3} fontWeight="bold" fontSize="md" textAlign="center">
                    {event.title}
                </Box>
                <Box color="gray.500" fontSize="sm">
                    開始時間：{moment(event.start_time).format("LL a h:mm")}
                </Box>
                <Box color="gray.500" fontSize="sm">
                    結束時間：{moment(event.end_time).format("LL a h:mm")}
                </Box>
            </CardBody>
            <CardFooter flexWrap="wrap" p={2} pt={0}>
                {event.hashtags.map(hashtag => (
                    <Tag
                        m={1}
                        colorScheme="blue"
                        key={hashtag}
                        onClick={e => {
                            e.stopPropagation();
                            setKeyword(`#${hashtag}`);
                        }}
                    >
                        #{hashtag}
                    </Tag>
                ))}
            </CardFooter>
        </Card>
    );
};
