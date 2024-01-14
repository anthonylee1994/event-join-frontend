import {create} from "zustand";

interface CreateEventStore {
    open: boolean;
    setModalOpen: (open: boolean) => void;
}

export const useCreateEventStore = create<CreateEventStore>(set => ({
    open: false,
    setModalOpen: open => set({open}),
}));
