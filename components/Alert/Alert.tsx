"use client"

import { useAlertStore } from "../../stores/useAlertStore";

export default function Alert() {
    const {isOpen, content, close} = useAlertStore();

    if (!isOpen) return null

    return (
        <div className="bg-background-base w-[90%] md:w-[500px] rounded-[8px] px-[20px] py-[16px] absolute top-[20px] translate-y-[0px] left-1/2 -translate-x-1/2 row-center gap-[10px] justify-between shadow-alert animate-fade-down animate-ease-in-out">
            <span className="overflow-hidden">{content}</span>

            <button onClick={close} className="text-[14px] font-semibold whitespace-nowrap">확인</button>
        </div>
    );
}
