export default function UserRatingError() {
    return (
        <div className="bg-[#FFFFFF] flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <h2 className="md:text-[24px] text-[16px] font-semibold">
                내 후기 관리
            </h2>

            <div className="text-font-secondary text-[14px] md:text-[16px]">
                후기를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
                시도해주세요.
            </div>
        </div>
    );
}
