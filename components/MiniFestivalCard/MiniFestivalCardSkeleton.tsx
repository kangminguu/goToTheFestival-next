export default function MiniFestivalCardSkeleton() {
    return (
        <div className="flex flex-col gap-[10px] w-[282px] p-[10px] rounded-[15px] bg-background-base animate-pulse">
            <div className="h-[190px] w-full rounded-[12px] bg-background-hover">
                <div className="w-[500px]" />
            </div>

            <div className="flex flex-row h-[52px] gap-[10px] items-start">
                <div className="h-[26px] w-[50px] rounded-[6px] bg-background-hover" />
                <div className="flex-1 h-[26px] bg-background-hover rounded" />
            </div>

            <div className="flex flex-row gap-[5px] items-center">
                <div className="w-[20px] h-[24px] bg-background-hover rounded-full" />
                <div className="w-[30px] h-[24px] bg-background-hover rounded" />
            </div>

            <div className="h-[21px] w-[80%] bg-background-hover rounded" />

            <div className="h-[21px] w-[60%] bg-background-hover rounded" />
        </div>
    );
}
