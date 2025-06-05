type AddressSizeType = "banner" | "card" | "detailPage";

interface AddressProps {
    address: string;
    sizeType: AddressSizeType;
}

const styles = {
    banner: {
        div: "gap-[5px] text-font-primary",
        img: "md:w-[24px] w-[12px]",
        svg: "location",
        text: "md:text-[20px] text-[12px]",
    },
    card: {
        div: "gap-[5px] text-font-secondary",
        img: "md:w-[15px] w-[12px]",
        svg: "location_gray",
        text: "md:text-[15px] text-[12px]",
    },
    detailPage: {
        div: "md:gap-[10px] gap-[5px] text-font-primary",
        img: "md:w-[20px] w-[15px]",
        svg: "location",
        text: "md:text-[18px] text-[15px]",
    },
};

const addressFormat = {
    banner: (address: string) => address.split(" ").slice(0, 2).join(" "),
    card: (address: string) => address.split(" ").slice(0, 3).join(" "),
    detailPage: (address: string) => address,
};

export default function Address({ address, sizeType }: AddressProps) {
    const { div, img, svg, text } = styles[sizeType];
    const formattedAddress = addressFormat[sizeType](address);

    return (
        <div className={`row-center ${div}`}>
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
