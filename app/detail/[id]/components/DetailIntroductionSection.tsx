"use client";

import Address from "../../../../components/Address/Address";
import Button from "../../../../components/Button/Button";
import EventDate from "../../../../components/EventDate/EventDate";
import ReadMore from "../../../../components/ReadMore/ReadMore";
import { convertBr } from "../../../../lib/utils";
import { useAlertStore } from "../../../../stores/useAlertStore";
import IconIntroduction from "./IconIntroduction";

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
}) {
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

    // 홈페이지 링크
    const homepageLink =
        homepage !== ""
            ? homepage
                  .split(" ")
                  .filter((a) => a.includes("href"))[0]
                  .replace("href=", "")
                  .replace(/["']/g, "")
            : "";

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <div className="flex flex-col md:gap-[20px] gap-[10px]">
                {/* 주소 */}
                <button className="row-center md:gap-[10px] gap-[5px]">
                    <Address address={address} sizeType="detailPage" />
                    <img
                        src="/assets/arrow/arrow.svg"
                        alt="address"
                        className=" rotate-180 w-[14px] md:w-[16px]"
                    />
                </button>

                {/* 기간 */}
                <EventDate
                    eventStartDate={eventStartDate}
                    eventEndDate={eventEndDate}
                    sizeType="detailPage"
                />

                {/* 개최 시간 */}
                <IconIntroduction
                    icon="/assets/time.svg"
                    introduction={playTime}
                />

                {/* 입장료, 참가비 */}
                <IconIntroduction icon="/assets/fee.svg" introduction={fee} />

                {/* 전화번호 */}
                <div className="row-center gap-[15px]">
                    <IconIntroduction
                        icon="/assets/call.svg"
                        introduction={tel}
                    />
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
                    <Button
                        title="공식 홈페이지"
                        icon="/assets/open_in_new.svg"
                        onClick={() => {}}
                    />
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
