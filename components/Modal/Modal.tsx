"use client";
import { useEffect, useRef } from "react";
import { useModalStore } from "../../stores/useModalStore";
import Button from "../Button/Button";

export default function Modal() {
    const { isOpen, title, contents, confirmText, onClick, close } =
        useModalStore();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
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
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-font-secondary text-[14px] whitespace-pre-wrap">
                        {contents}
                    </p>
                </div>

                <div className="flex flex-row gap-[10px] justify-end">
                    <Button
                        onClick={() => {
                            close();
                        }}
                        title="취소"
                    />
                    <button
                        onClick={onClick}
                        className="text-font-highlight px-[14px] py-[10px] rounded-button font-semibold text-[14px] hover-active"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
