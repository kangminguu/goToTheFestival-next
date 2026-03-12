"use client";

import {
    ArrowIcon,
    CallIcon,
    ClockIcon,
    OpenInNewIcon,
    TicketIcon,
} from "@/components/Icons";
import Address from "@/components/Address/Address";
import Button from "@/components/Button/Button";
import EventDate from "@/components/EventDate/EventDate";
import ReadMore from "@/components/ReadMore/ReadMore";
import { convertBr, convertToDashDateFormat } from "@/lib/utils";
import { useAlertStore } from "@/stores/useAlertStore";

interface DetailIntroductionSectionProps {
    address: string;
    eventStartDate: string;
    eventEndDate: string;
    playTime?: string;
    fee?: string;
    tel?: string;
    homepage?: string;
    info_1?: string;
    info_2?: string;
}

export default function DetailIntroductionSection({
    address,
    eventStartDate,
    eventEndDate,
    playTime = "",
    fee = "",
    tel = "",
    homepage = "",
    info_1 = "",
    info_2 = "",
}: DetailIntroductionSectionProps) {
    const { open, close } = useAlertStore();

    const handleCopy = async () => {
        close();

        try {
            await navigator.clipboard.writeText(`${tel}`);
            open("전화번호를 복사했습니다.");
        } catch {
            open("전화번호 복사에 실패했습니다.");
        }
    };

    const handleMoveScrollToLocation = () => {
        document.getElementById("location-section")!.scrollIntoView({
            behavior: "smooth",
        });
    };

    // 홈페이지 링크
    const homepageLink = homepage.includes("href")
        ? homepage
              .split(" ")
              .filter((a) => a.includes("href"))[0]
              .replace("href=", "")
              .replace(/["']/g, "")
        : homepage;

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <div className="flex flex-col md:gap-[20px] gap-[10px]">
                {/* 주소 */}
                <button
                    onClick={handleMoveScrollToLocation}
                    className="row-center md:gap-[10px] gap-[5px]"
                >
                    <Address address={address} sizeType="detailPage" />

                    <div className="w-[14px] md:w-[16px]">
                        <ArrowIcon size={16} color="#767676" />
                    </div>
                </button>

                {/* 기간 */}
                <EventDate
                    eventStartDate={convertToDashDateFormat(eventStartDate)}
                    eventEndDate={convertToDashDateFormat(eventEndDate)}
                    sizeType="detailPage"
                />

                {/* 개최 시간 */}
                <div className="flex flex-row items-start md:gap-[10px] gap-[5px]">
                    <div className="shrink-0 md:w-[20px] w-[15px] md:h-[20px] h-[15px] mt-[3.5px]">
                        <ClockIcon color="#333333" />
                    </div>
                    <p className="md:text-[18px] text-[15px] whitespace-pre-line">
                        {convertBr(playTime)}
                    </p>
                </div>

                {/* 입장료, 참가비 */}
                <div className="flex flex-row items-start md:gap-[10px] gap-[5px]">
                    <div className="shrink-0 md:w-[20px] w-[15px] md:h-[20px] h-[15px] mt-[3.5px]">
                        <TicketIcon color="#333333" />
                    </div>
                    <p className="md:text-[18px] text-[15px] whitespace-pre-line">
                        {convertBr(fee)}
                    </p>
                </div>

                {/* 전화번호 */}
                <div className="flex flex-row items-center md:gap-[10px] gap-[5px]">
                    <div className="shrink-0 md:w-[20px] w-[15px] md:h-[20px] h-[15px]">
                        <CallIcon color="#333333" />
                    </div>

                    <p className="md:text-[18px] text-[15px] whitespace-pre-line">
                        {convertBr(tel)}
                    </p>

                    <button
                        onClick={handleCopy}
                        className="text-[14px] font-semibold whitespace-nowrap text-font-activeButton"
                    >
                        복사
                    </button>
                </div>
            </div>

            {/* 홈페이지 새창 열기 버튼 */}
            {homepage !== "" ? (
                <a
                    className="w-fit"
                    href={homepageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button>
                        <OpenInNewIcon size={16} />
                        공식 홈페이지
                    </Button>
                </a>
            ) : null}

            {/* 축제 상세 설명 */}
            <ReadMore
                content={
                    <div className="flex flex-col gap-[20px]">
                        {info_1 ? (
                            <p className="text-font-secondary md:text-[16px] text-[15px] font-normal whitespace-pre-line">
                                {convertBr(info_1)}
                            </p>
                        ) : null}
                        {info_2 ? (
                            <p className="text-font-secondary md:text-[16px] text-[15px] font-normal whitespace-pre-line">
                                {convertBr(info_2)}
                            </p>
                        ) : null}
                    </div>
                }
            />
        </div>
    );
}
