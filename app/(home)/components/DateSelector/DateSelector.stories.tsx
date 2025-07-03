import type { Meta, StoryObj } from "@storybook/react";
import DateSelector from "./DateSelector";

const meta: Meta<typeof DateSelector> = {
    title: "Page/home/DateSelector",
    component: DateSelector,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "홈 페이지에 들어가는 DateSelector 컴포넌트 입니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DateSelector>;

export const DateSelector_default: Story = {
    args: {},
};
