import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";
import { useAlertStore } from "../../stores/useAlertStore";

const setAlertStore = () => {
    useAlertStore.setState({
        isOpen: true,
        content: "스토리북에서 알림이 표시됩니다.",
        close: () => useAlertStore.setState({ isOpen: false }),
    });
};

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "복사와 같은 동작의 알림을 띄워줍니다.",
            },
        },
    },
    decorators: [
        (Story) => {
            setAlertStore();
            return <Story />;
        },
    ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Alert_default: Story = {};
