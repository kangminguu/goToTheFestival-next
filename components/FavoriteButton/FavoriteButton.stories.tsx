import type { Meta, StoryObj } from "@storybook/react";
import FavoriteButton from "./FavoriteButton";

const meta: Meta<typeof FavoriteButton> = {
    title: "Components/FavoriteButton",
    component: FavoriteButton,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "기본 버튼 컴포넌트입니다. `title`을 받아 표시하고, `isBorder`가 true이면 테두리를 보여줍니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FavoriteButton>;

export const FavoriteButton_Card: Story = {
    args: {
        contentId: "1841539",
        sizeType: "card",
    },
};

export const FavoriteButton_DetailPage: Story = {
    args: {
        contentId: "1841539",
        sizeType: "detailPage",
    },
};
