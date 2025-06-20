import Address from "../../../../components/Address/Address";
import EventDate from "../../../../components/EventDate/EventDate";

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
    const formatPlayTime =
        playTime !== ""
            ? playTime.replace(/<br\s*\/?>/gi, "<br>").split("<br>") // <Br>의 경우도 <br>로 바꿔줘서 처리할 수 있도록
            : [playTime];

    return (
        <div className="border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px]">
            <div className="flex flex-col md:gap-[20px] gap-[10px]">
                {/* 주소 */}
                <button className="row-center md:gap-[10px] gap-[5px]">
                    <Address address={address} sizeType="detailPage" />
                    <img
                        src="/assets/arrow/arrow.svg"
                        alt="rating"
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
                {playTime !== "" ? (
                    <div className="flex flex-row items-start md:gap-[10px] gap-[5px]">
                        <div className="h-[22px] md:h-[27px] row-center">
                            <img
                                src="/assets/time.svg"
                                alt="time"
                                className="md:w-[20px] w-[15px]"
                            />
                        </div>
                        <div className="flex flex-col gap-[3px]">
                            {formatPlayTime.map((item, index) => (
                                <p
                                    key={index}
                                    className="md:text-[18px] text-[15px] line-clamp-1"
                                >
                                    {item.trim()}
                                </p>
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* 입장료, 참가비 */}

                {/* 전화번호 */}
            </div>
        </div>
    );
}
