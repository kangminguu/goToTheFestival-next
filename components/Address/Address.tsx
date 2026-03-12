import { LocationIcon } from "../Icons";

type AddressSizeType = "banner" | "card" | "detailPage";

interface AddressProps {
    address: string;
    sizeType: AddressSizeType;
}

const styles = {
    banner: {
        div: "gap-[5px]",
        svg: "md:w-[24px] w-[15px] text-[#333333]",
        text: "md:text-[20px] text-[14px]",
    },
    card: {
        div: "gap-[5px] text-font-secondary",
        svg: "w-[15px] text-[#767676]",
        text: "md:text-[15px] text-[12px]",
    },
    detailPage: {
        div: "md:gap-[10px] gap-[5px]",
        svg: "md:w-[20px] w-[15px] text-[#333333]",
        text: "md:text-[18px] text-[15px]",
    },
};

const addressFormat = {
    banner: (address: string) => address.split(" ").slice(0, 2).join(" "),
    card: (address: string) => address.split(" ").slice(0, 3).join(" "),
    detailPage: (address: string) => address,
};

export default function Address({ address, sizeType }: AddressProps) {
    const { div, svg, text } = styles[sizeType];
    const formattedAddress = addressFormat[sizeType](address);

    return (
        <div className={`row-center ${div}`}>
            <div className={`group ${svg}`}>
                <LocationIcon />
            </div>
            <p className={`${text} line-clamp-1`}>{formattedAddress}</p>
        </div>
    );
}
