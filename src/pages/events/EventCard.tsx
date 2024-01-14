import {Event} from "../../types/event.ts";
import {AspectRatio, Box, Card, CardBody, CardFooter, Image, Tag} from "@chakra-ui/react";
import moment from "moment";
import {useEventStore} from "../../stores/useEventStore.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    event: Event;
}

export const EventCard = ({event}: Props) => {
    const setKeyword = useEventStore(state => state.setKeyword);

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/details/${event.id}`);
    };

    return (
        <Card cursor="pointer" w="full" borderRadius="2xl" overflow="hidden" mb={2} onClick={onClick}>
            {event.photo_url && (
                <AspectRatio ratio={16 / 9}>
                    <Image w="full" src={event.photo_url} />
                </AspectRatio>
            )}
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
            {event.hashtags.length > 0 && (
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
            )}
        </Card>
    );
};
