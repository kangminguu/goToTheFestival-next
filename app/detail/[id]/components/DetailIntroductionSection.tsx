import Address from "../../../../components/Address/Address";
import EventDate from "../../../../components/EventDate/EventDate";
import IconIntroduction from "./IconIntroduction";

interface DetailIntroductionSectionProps {
    address: string;
    eventStartDate: string;
    eventEndDate: string;
    playTime?: string;
    fee?: string;
    call?: string;
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
    call = "",
    homepage = "",
    info_1 = "",
    info_2 = "",
}) {
    return (
        <div className="border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px]">
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
            </div>
        </div>
    );
}
