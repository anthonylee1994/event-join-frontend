import {create} from "zustand";
import {apiClient} from "../util/apiClient.ts";
import {Event} from "../types/event.ts";

interface EventStore {
    isFetching: boolean;
    keyword: string;
    setKeyword: (keyword: string) => void;
    events: Event[];
    fetchEvents: () => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
    isFetching: false,
    keyword: "",
    setKeyword: (keyword: string) => set({keyword}),
    events: [],
    async fetchEvents() {
        set({isFetching: true});
        let q = get().keyword;
        const isHashtag = q[0] === "#";
        if (isHashtag) {
            q = q.slice(1);
        }

        const response = await apiClient.get(`/events/${isHashtag ? "hashtag" : "upcoming"}`, {params: {q}});
        set({events: response.data, isFetching: false, keyword: get().keyword});
    },
}));
