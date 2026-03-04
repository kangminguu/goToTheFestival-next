export type BannerFestival = {
    contentid: string;
    title: string;
    addr1: string;
    first_image: string;
    event_start: string;
    event_end: string;
};

export interface BannerProps {
    festivalList: BannerFestival[];
    currentMonth: number;
}
