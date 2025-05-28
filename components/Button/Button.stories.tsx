import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "기본 버튼 컴포넌트입니다. `title`을 받아 표시하고, `isBorder`가 true이면 테두리를 보여줍니다.",
            },
        },
    },
    argTypes: {
        onClick: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Button_Default: Story = {
    args: {
        title: "기본 버튼",
    },
};

export const Button_Border: Story = {
    args: {
        title: "테두리 버튼",
        isBorder: true,
    },
};
