import { createClient } from "@/lib/utils/server";
import UserReviewList from "./UserReview/UserReviewList";
import UserRatingError from "./UserRatingError";

export default async function UserRatingSection({ reviews }: any) {
    const supabase = await createClient();

    const reviewContentIds = reviews.map((review: any) => review.festival_id);

    const { data, error } = await supabase
        .from("festivals")
        .select("contentid, title")
        .in("contentid", reviewContentIds)
        .eq("deleted", false);

    if (error) {
        console.error("DB 조회 실패:", error);
        return <UserRatingError />;
    }

    const userReviews = reviews.map((review: any) => {
        const festival = data.find(
            (item: any) => item.contentid === review.festival_id,
        );

        return {
            title: festival.title,
            rating: review.rating,
            created_at: review.created_at,
            content: review.content,
            contentId: review.festival_id,
        };
    });

    return (
        <div className="bg-[#FFFFFF] flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <h2 className="md:text-[24px] text-[16px] font-semibold">
                내 후기 관리
            </h2>

            <UserReviewList userReviews={userReviews} />
        </div>
    );
}
