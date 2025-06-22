"use client";

import { Map, useKakaoLoader, CustomOverlayMap } from "react-kakao-maps-sdk";
import Button from "../../../../components/Button/Button";
import { useAlertStore } from "../../../../stores/useAlertStore";

interface DetailLocationProps {
    address: string;
    mapx: string;
    mapy: string;
}

export default function DetailLocationSection({
    address,
    mapx,
    mapy,
}: DetailLocationProps) {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
    });

    const { open, close } = useAlertStore();

    const handleCopy = async () => {
        close();

        try {
            await navigator.clipboard.writeText(`${address}`);
            open("주소를 복사했습니다.");
        } catch {
            open("주소 복사에 실패했습니다.");
        }
    };

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <div className="row-center justify-between">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    위치 보기
                </h2>

                <a
                    className="w-fit"
                    href={`https://map.kakao.com/?q=${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button title="지도 보기" icon="/assets/open_in_new.svg" />
                </a>
            </div>

            <div className="row-center gap-[15px]">
                <p className="md:text-[18px] text-[15px] text-font-secondary">
                    {address}
                </p>
                <button
                    onClick={handleCopy}
                    className="text-[14px] font-semibold whitespace-nowrap text-font-activeButton"
                >
                    복사
                </button>
            </div>

            <Map
                center={{ lat: parseFloat(mapy), lng: parseFloat(mapx) }}
                level={3}
                className="w-full md:h-[385px] h-[200px] rounded-[6px]"
            >
                <CustomOverlayMap
                    position={{ lat: parseFloat(mapy), lng: parseFloat(mapx) }}
                >
                    <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]">
                        <img
                            src="/assets/marker.svg"
                            alt="marker"
                            className="w-full h-full"
                        />
                    </div>
                </CustomOverlayMap>
            </Map>
        </div>
    );
}
