import { ReactNode } from "react";

export default function AISummaryTag({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gradient-to-r from-[#864AFF] to-[#4A92FF] h-fit w-fit px-[10px] py-[4px] rounded-[6px] font-semibold text-[12px] text-font-inverted whitespace-nowrap">
            {children}
        </div>
    );
}
