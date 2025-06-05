import type { Meta, StoryObj } from "@storybook/react";
import Address from "./Address";

const meta: Meta<typeof Address> = {
    title: "Components/Address",
    component: Address,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "축제 위치를 표시하는 Address 컴포넌트입니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Address>;

export const Address_banner: Story = {
    args: {
        address: "부산광역시 수영구 광안해변로 219",
        sizeType: "banner",
    },
};
export const Address_card: Story = {
    args: {
        address: "부산광역시 수영구 광안해변로 219",
        sizeType: "card",
    },
};
export const Address_detailPage: Story = {
    args: {
        address: "부산광역시 수영구 광안해변로 219",
        sizeType: "detailPage",
    },
};
