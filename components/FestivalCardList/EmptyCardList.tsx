import Image from "next/image";

export default function EmptyCardList() {
    return (
        <div className="w-full col-center pt-[20px] md:pt-[100px] gap-[20px]">
            <div className="w-[100px]">
                <Image
                    src="/assets/no_result.png"
                    alt="no_result"
                    width={200}
                    height={0}
                />
            </div>

            <div className="col-center gap-[10px]">
                <span className="font-semibold text-[20px]">검색 결과가 없어요</span>
                <span className="text-font-secondary">지역이나 기간을 다시 설정해보세요.</span>
            </div>
        </div>
    );
}
