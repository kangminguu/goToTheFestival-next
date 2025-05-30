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

export const EventDate_size00: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        size: 0,
    },
};
export const EventDate_size01: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        size: 1,
    },
};
export const EventDate_size02: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        size: 2,
    },
};
export const EventDate_size03: Story = {
    args: {
        eventStartDate: "20250501",
        eventEndDate: "20250531",
        size: 3,
    },
};
