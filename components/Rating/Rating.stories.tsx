import type { Meta, StoryObj } from "@storybook/react";
import Rating from "./Rating";

const meta: Meta<typeof Rating> = {
    title: "Components/Rating",
    component: Rating,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "축제 평점을 나타내는 Rating 컴포넌트입니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Rating_default: Story = {
    args: {
        rating: 3,
        size: 24,
    },
};
