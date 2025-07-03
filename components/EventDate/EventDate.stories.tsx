import type { Meta, StoryObj } from "@storybook/react";
import EventDate from "./EventDate";

const meta: Meta<typeof EventDate> = {
    title: "Components/EventDate",
    component: EventDate,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "축제 기간을 표시하는 EventDate 컴포넌트입니다.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EventDate>;

export const EventDate_banner: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        sizeType: "banner",
    },
};
export const EventDate_card: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        sizeType: "card",
    },
};
export const EventDate_detailPage: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        sizeType: "detailPage",
    },
};
