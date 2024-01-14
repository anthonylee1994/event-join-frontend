import {create} from "zustand";
import {Event} from "../types/event.ts";
import {apiClient} from "../util/apiClient.ts";

interface DetailStore {
    isFetching: boolean;
    detail: Event | null;
    fetchDetail: (id: string) => Promise<void>;
}

export const useDetailStore = create<DetailStore>(set => ({
    isFetching: false,
    detail: null,
    fetchDetail: async (id: string) => {
        set({isFetching: true});
        const response = await apiClient.get(`/events/${id}`);
        set({detail: response.data, isFetching: false});
    },
}));
