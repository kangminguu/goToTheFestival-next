"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/Button/Button";
import { useWriteReviewModalStore } from "../../../../../stores/useWriteReviewModalStore";
import RatingButtons from "./RatingButtons";
import { useRouter } from "next/navigation";

export default function WriteReviewModal() {
    // 모달창
    const { isOpen, title, close, onSubmitReview } = useWriteReviewModalStore();

    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");

    // 후기 모달창 닫기
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setRating(0);
                setContent("");
                close(); // 모달 외부영역 클릭 및 터치 시 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [close]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] col-center justify-center px-[20px]">
            <div
                ref={ref}
                className="bg-[#ffffff] shadow-window rounded-[8px] gap-[32px] flex flex-col md:w-[440px] w-full px-[20px] pt-[24px] pb-[16px]"
            >
                <div className="flex flex-col gap-[16px]">
                    <h3 className="font-semibold text-center">{title}</h3>

                    <RatingButtons rating={rating} setRating={setRating} />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmitReview(rating, content);
                        }}
                        className="flex flex-col gap-[16px]"
                    >
                        <label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="해당 축제에 대한 여러분의 경험을 공유해주세요."
                                className="w-full h-[100px] resize-none bg-background-hover rounded-[8px] px-[20px] py-[15px] placeholder:text-font-muted"
                            />
                        </label>

                        <div className="flex flex-col gap-[32px]">
                            <div className="row-center gap-[5px]">
                                <img
                                    className="w-[15px] md:w-[20px]"
                                    src="/assets/info.svg"
                                    alt="info"
                                />
                                <span className="text-[12px] md:text-[14px] text-font-secondary">
                                    축제가자 서비스 전반에 공유됨
                                </span>
                            </div>

                            <div className="flex flex-row gap-[10px] justify-end">
                                {/* 취소 버튼 */}
                                <Button
                                    onClick={() => {
                                        setRating(0);
                                        setContent("");
                                        close();
                                    }}
                                    title="취소"
                                />
                                {/* 후기 작성 버튼 */}
                                <button
                                    type="submit"
                                    // 1, 2, 3, 4, 5점이 아니라면 후기 작성 불가 : 0점 방지
                                    disabled={![1, 2, 3, 4, 5].includes(rating)}
                                    className={`text-font-highlight disabled:text-font-muted disabled:hover:bg-[#ffffff] disabled:active:bg-[#ffffff] px-[14px] py-[10px] rounded-button font-semibold text-[14px] hover-active`}
                                >
                                    작성완료
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
