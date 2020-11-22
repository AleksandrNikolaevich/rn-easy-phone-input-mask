import React from "react";
import { NotificationParams } from "./types";
export declare type State = {
    notifications: Record<string, NotificationParams>;
};
interface AddNotify {
    type: typeof NotificationsActions.add;
    notify: NotificationParams & {
        id: string;
    };
}
interface RemoveNotify {
    type: typeof NotificationsActions.remove;
    id: string;
}
export declare type TNotificationsActions = AddNotify | RemoveNotify;
export declare enum NotificationsActions {
    add = "add",
    remove = "remove"
}
export default function (): [State, React.Dispatch<TNotificationsActions>];
export {};
