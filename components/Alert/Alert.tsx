"use client";

import { useAlertStore } from "../../stores/useAlertStore";

export default function Alert() {
    const { isOpen, content, close } = useAlertStore();

    if (!isOpen) return null;

    return (
        <div className="w-full fixed top-[20px] flex justify-center z-50 pointer-events-none">
            <div
                className={`animate-fade-down animate-duration-1000 animate-alternate-reverse animate-delay-1000 bg-background-base w-[90%] md:w-[500px] rounded-[8px] px-[20px] py-[16px] row-center gap-[10px] justify-between pointer-events-auto shadow-alert`}
            >
                <span className="overflow-hidden">{content}</span>

                <button
                    onClick={() => {
                        close();
                    }}
                    className="text-[14px] font-semibold whitespace-nowrap"
                >
                    확인
                </button>
            </div>
        </div>
    );
}
