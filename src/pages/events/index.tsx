import React from "react";
import {useEventStore} from "../../stores/useEventStore.ts";
import {EventCard} from "./EventCard.tsx";
import {Box, VStack} from "@chakra-ui/react";
import {SearchBar} from "./SearchBar.tsx";
import {EmptyPlaceholder} from "../../components/EmptyPlaceholder.tsx";
import {CreateModal} from "./CreateModal";
import {LinearProgress} from "../../components/LinearProgress.tsx";

export const EventPage = () => {
    const isFetching = useEventStore(state => state.isFetching);
    const fetchEvents = useEventStore(state => state.fetchEvents);
    const keyword = useEventStore(state => state.keyword);
    const events = useEventStore(state => state.events);

    React.useEffect(() => {
        fetchEvents();
    }, [fetchEvents, keyword]);

    return (
        <Box>
            <LinearProgress isLoading={isFetching} />
            <SearchBar />
            {events.length === 0 && <EmptyPlaceholder />}
            <VStack bgColor="transparent" p={4}>
                {events.map(event => (
                    <EventCard event={event} key={event.id} />
                ))}
            </VStack>
            <CreateModal />
        </Box>
    );
};
