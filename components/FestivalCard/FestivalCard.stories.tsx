import type { Meta, StoryObj } from "@storybook/react";
import FestivalCard from "./FestivalCard";

const meta: Meta<typeof FestivalCard> = {
    title: "Components/FestivalCard",
    component: FestivalCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "축제를 표시하는 카드 컴포넌트입니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FestivalCard>;

export const FestivalCard_default: Story = {
    args: {
        festival: {
            addr1: "서울특별시 송파구 올림픽로 424 (방이동)",
            contentid: "3488940",
            eventstartdate: "20250530",
            eventenddate: "20250622",
            firstimage:
                "http://tong.visitkorea.or.kr/cms/resource/39/3488939_image3_1.jpg",
            title: "MyK FESTA(마이케이 페스타)",
        },
        isLoading: false,
    },
};

export const FestivalCard_loading: Story = {
    args: {
        festival: {
            addr1: "서울특별시 송파구 올림픽로 424 (방이동)",
            contentid: "3488940",
            eventstartdate: "20250530",
            eventenddate: "20250622",
            firstimage:
                "http://tong.visitkorea.or.kr/cms/resource/39/3488939_image3_1.jpg",
            title: "MyK FESTA(마이케이 페스타)",
        },
        isLoading: true,
    },
};
