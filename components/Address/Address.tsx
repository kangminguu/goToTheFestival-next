type AddressSizeType = 0 | 1 | 2 | 3; // 사이즈 순서대로

interface AddressProps {
    address: string;
    size?: AddressSizeType;
}

const addressStyles = {
    0: {
        div: "gap-[5px] text-font-secondary",
        img: "w-[20px]",
        svg: "location_767676",
        text: "text-[14px]",
    },
    1: {
        div: "gap-[5px] text-font-secondary",
        img: "w-[20px]",
        svg: "location_767676",
        text: "text-[15px]",
    },
    2: {
        div: "gap-[8px] text-font-primary",
        img: "w-[20px]",
        svg: "location_333333",
        text: "text-[20px]",
    },
    3: {
        div: "gap-[8px] text-font-primary",
        img: "w-[24px]",
        svg: "location_333333",
        text: "text-[20px]",
    },
};

const addressFormat = {
    0: (address: string) => address.split(" ").slice(0, 3).join(" "),
    1: (address: string) => address.split(" ").slice(0, 3).join(" "),
    2: (address: string) => address,
    3: (address: string) => address.split(" ").slice(0, 2).join(" "),
};

export default function Address({ address, size = 0 }: AddressProps) {
    const { div, img, svg, text } = addressStyles[size];
    const formattedAddress = addressFormat[size](address);

    return (
        <div className={`flex flex-row ${div}  items-center`}>
            <img
                className={`${img}`}
                src={`/assets/location/${svg}.svg`}
                alt="location"
            />
            <p className={`font-pretendard font-medium ${text}`}>
                {formattedAddress}
            </p>
        </div>
    );
}
