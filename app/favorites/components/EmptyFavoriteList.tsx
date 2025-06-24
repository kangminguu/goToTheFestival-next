import Image from "next/image";

export default function EmptyFavoriteList() {
    return (
        <div className="w-full col-center pt-[20px] md:pt-[100px] gap-[20px]">
            <div className="w-[100px]">
                <Image
                    src="/assets/no_favorite.png"
                    alt="no_favorite"
                    width={200}
                    height={0}
                />
            </div>

            <div className="col-center gap-[10px]">
                <span className="font-semibold text-[20px]">
                    찜한 축제가 없어요
                </span>
                <span className="text-font-secondary text-center">
                    마음에 드는 축제를 찾아 찜 버튼을 눌러보세요.
                    <br />
                    나만의 축제 리스트를 만들 수 있어요!
                </span>
            </div>
        </div>
    );
}
