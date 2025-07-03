import Image from "next/image";

type ListType = "home" | "favorite";

export default function EmptyCardList({ listType }: { listType: ListType }) {
    const image = {
        home: { src: "/assets/no_result.png", alt: "no_result" },
        favorite: { src: "/assets/no_favorite.png", alt: "no_favorite" },
    };

    const span = {
        home: {
            content: "검색 결과가 없어요",
            subContent: "지역이나 기간을 다시 선택해보세요.",
        },
        favorite: {
            content: "찜한 축제가 없어요",
            subContent:
                "마음에 드는 축제를 찾아 찜 버튼을 눌러보세요.\n나만의 축제 리스트를 만들 수 있어요!",
        },
    };

    return (
        <div className="w-full col-center pt-[20px] md:pt-[100px] gap-[20px]">
            <div className="w-[100px]">
                <Image
                    src={image[listType].src}
                    alt={image[listType].alt}
                    width={200}
                    height={0}
                />
            </div>

            <div className="col-center gap-[10px]">
                <span className="font-semibold text-[20px]">
                    {span[listType].content}
                </span>
                <span className="text-font-secondary text-center whitespace-pre-line">
                    {span[listType].subContent}
                </span>
            </div>
        </div>
    );
}
