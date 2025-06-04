import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
    title: "Components/Header",
    component: Header,
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
type Story = StoryObj<typeof Header>;

export const default_Header: Story = {
    args: {
        mockPathname: "/",
    },
};
