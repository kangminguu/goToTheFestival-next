import type { Meta, StoryObj } from "@storybook/react";
import RegionSelector from "./RegionSelector";

const meta: Meta<typeof RegionSelector> = {
    title: "Page/home/RegionSelector",
    component: RegionSelector,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "홈 페이지에 들어가는 RegionSelector 컴포넌트 입니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RegionSelector>;

export const RegionSelector_default: Story = {
    args: {},
};
