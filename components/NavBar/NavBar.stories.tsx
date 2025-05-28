import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "./NavBar";

const meta: Meta<typeof NavBar> = {
    title: "Components/NavBar",
    component: NavBar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "header의 내비게이션 바 입니다. 로그인 여부에 따라 변경되어야합니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Navigation_Bar: Story = {
    args: {},
};
