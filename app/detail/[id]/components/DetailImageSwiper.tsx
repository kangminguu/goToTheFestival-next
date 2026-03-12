"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "@/styles/detailImage.swiper.css";

import { useState } from "react";

export default function DetailImageSwiper({
    imageList,
}: {
    imageList: {
        contentid?: string;
        cpyrhtDivCd?: string;
        smallimageurl?: string;
        originimgurl: string;
        imgname: string;
        serialnum: string;
    }[];
}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const imageURLs: string[] = [];
    const filteredImages = imageList.filter((festival) => {
        if (!imageURLs.includes(festival.originimgurl)) {
            imageURLs.push(festival.originimgurl);
            return festival;
        }
    });

    const sortedImages = filteredImages.sort((festival, _) => {
        if (festival.imgname.includes("포스터")) return -1;
    });

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
                {sortedImages.map((festival, index) => (
                    <SwiperSlide
                        key={festival.serialnum}
                        className="relative md:h-[516px] h-[250px]"
                    >
                        <div className="absolute z-10 flex items-center justify-center h-full w-full">
                            {/* <Image
                                src={festival.originimgurl}
                                alt={festival.imgname}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                                priority={index === 0}
                            /> */}
                            <img
                                src={festival.originimgurl}
                                alt={festival.imgname}
                                className="object-contain"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                        {/* <Image
                            src={festival.originimgurl}
                            alt={festival.imgname}
                            fill
                            className="object-cover blur-sm opacity-60"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                            priority={index === 0}
                        /> */}
                        <img
                            src={festival.originimgurl}
                            alt={festival.imgname}
                            className="absolute object-cover blur-sm opacity-60"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
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
                {sortedImages.map((festival) => (
                    <SwiperSlide key={festival.serialnum}>
                        {/* <Image
                            src={festival.originimgurl}
                            alt={festival.imgname}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                        /> */}
                        <img
                            src={festival.originimgurl}
                            alt={festival.imgname}
                            className="object-cover"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
