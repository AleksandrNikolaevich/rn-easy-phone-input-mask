import * as React from "react";
import { NotificationActions, NotificationParams, NotificationTheme } from "./types";
export declare type NotificationProps = {
    render?: (args: NotificationParams & NotificationActions) => React.ReactNode;
    vibration?: boolean;
    showingCountInMoment?: number;
    theme?: NotificationTheme;
    offsetTop?: number;
};
declare const Notification: React.FC<NotificationParams & NotificationProps & {
    onClose: (height: number) => void;
    offset: number;
    id: string;
    onLayout: (height: number, setOffsetTop: (h: number) => void) => void;
}>;
export default Notification;
