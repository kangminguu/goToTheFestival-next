import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
    title: "Components/Footer",
    component: Footer,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "footer입니다. 메일을 보낼 수 있는 링크와 깃헙 링크를 포함합니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Navigation_Bar: Story = {
    args: {},
};
