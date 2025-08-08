import { getFestivalCommon } from "../../../lib/api/festival";
import UserReviewList from "./UserReview/UserReviewList";

export default async function UserRatingSection({ reviews }) {
    const userReviews = await Promise.all(
        reviews.map(async (review) => {
            const festivalCommon = await getFestivalCommon(review.festival_id);

            // 축제 제목을 추가해서 리뷰를 리턴
            return {
                title: festivalCommon.title,
                rating: review.rating,
                created_at: review.created_at,
                content: review.content,
                contentId: review.festival_id,
            };
        })
    );

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <h2 className="md:text-[24px] text-[16px] font-semibold">
                내 후기 관리
            </h2>

            <UserReviewList userReviews={userReviews} />
        </div>
    );
}
