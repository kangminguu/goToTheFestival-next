"use client";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { REGION_LIST } from "../../../../constants/regions";
import RegionButton from "./RegionButton";
import { useRegionStore } from "../../../../stores/index";

/**
 * 축제 검색 시 지역을 설정하는 컴포넌트입니다.
 * @returns RegionSelector
 */
export default function RegionSelector() {
    const regions = REGION_LIST;

    const { regionCode, setRegionCode } = useRegionStore();

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
                        isSelect={regionCode === code}
                        onClick={() => setRegionCode(code)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
