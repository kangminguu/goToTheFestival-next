"use client";

import "../../../../styles/banner.swiper.css";

// Swiper
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import BannerCard from "./BannerCard";

export default function Banner({ festivalList }) {
    return (
        <Swiper
            className="bannerSwiper drag-prevent"
            pagination
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            loop
            modules={[Pagination, Autoplay]}
        >
            {festivalList.map((festival) => (
                <SwiperSlide key={festival.contentid}>
                    <BannerCard festival={festival} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
