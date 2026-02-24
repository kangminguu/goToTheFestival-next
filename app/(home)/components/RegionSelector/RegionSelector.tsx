"use client";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../../../styles/regionSelector.swiper.css";

import { REGION_LIST, RegionCode } from "../../../../constants/regions";
import RegionButton from "./RegionButton";

interface RegionSelectorProps {
    region: RegionCode;
    setRegion: (region: RegionCode) => void;
}

/**
 * 축제 검색 시 지역을 설정하는 컴포넌트입니다.
 * @returns RegionSelector
 */
export default function RegionSelector({
    region,
    setRegion,
}: RegionSelectorProps) {
    const regions = REGION_LIST; // 지역 목록

    return (
        <Swiper
            className="regionSelectorSwiper drag-prevent"
            slidesPerView={"auto"}
            spaceBetween={10}
        >
            {regions.map(({ rnum, code, name }) => (
                <SwiperSlide key={rnum}>
                    <RegionButton
                        region={name}
                        isSelect={region === code}
                        onClick={() => {
                            setRegion(code);
                        }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
