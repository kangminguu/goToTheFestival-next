export type FestivalReview = {
    id: string;
    festival_id: string;
    user_id: string;
    user_name: string;
    rating: number;
    content: string;
    created_at: string;
};

export type UserReview = {
    id: string;
    festival_id: string;
    user_id: string;
    rating: number;
    content: string;
    created_at: string;
};

export type DetailRatingSectionProps = {
    contentId: string;
    title: string;
    avgRating: number;
    reviewCount: number;
};

export type FestivalRatingsResponse = {
    avgRating: number;
    reviewCount: number;
};

export type FestivalReviewsResponse = {
    reviews: FestivalReview[];
    myReview: UserReview | null;
    isLogin: boolean;
};
