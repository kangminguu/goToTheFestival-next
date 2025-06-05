"use client";

import { REGION_LIST } from "../../../../constants/regions";
import RegionButton from "./RegionButton";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { useRegionStore } from "../../../../stores/useRegionStore";

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
