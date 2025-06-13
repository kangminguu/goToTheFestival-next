"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../../../../styles/detailImage.swiper.css";

import { useState } from "react";
import Image from "next/image";

export default function DetailImageSwiper({ imageList }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="drag-prevent">
            <Swiper
                loop
                pagination={{
                    type: "fraction",
                }}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="mainImageSwiper"
            >
                {imageList.map((festival, index) => (
                    <SwiperSlide
                        key={festival.serialnum}
                        className="relative md:h-[516px] h-[250px]"
                    >
                        <Image
                            src={festival.originimgurl}
                            alt={festival.imgname}
                            fill
                            className="object-cover blur-sm opacity-60"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                            priority={index === 0}
                        />

                        <div className="relative z-10 flex items-center justify-center h-full">
                            <Image
                                src={festival.originimgurl}
                                alt={festival.imgname}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbSwiper"
            >
                {imageList.map((festival) => (
                    <SwiperSlide key={festival.serialnum}>
                        <Image
                            src={festival.originimgurl}
                            alt={festival.imgname}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
