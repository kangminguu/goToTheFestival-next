import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
    title: "Components/Tag",
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "축제의 상태를 나타내는 Tag 컴포넌트입니다. 예정이면 태그를 표시하지 않습니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Tag_ongoing: Story = {
    args: {
        eventStartDate: "20250101",
        eventEndDate: "20251231",
    },
};

export const Tag_ended: Story = {
    args: {
        eventStartDate: "20250101",
        eventEndDate: "20250101",
    },
};
