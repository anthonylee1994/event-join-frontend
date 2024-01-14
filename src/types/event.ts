export interface Event {
    id: number;
    user_id: number;
    photo_url?: string;
    title: string;
    description: string;
    start_time: string;
    end_time?: string;
    address?: string;
    quota?: string;
    fee?: string;
    hashtags: string[];
    join_link: string;
    created_at: string;
    updated_at: string;
}
