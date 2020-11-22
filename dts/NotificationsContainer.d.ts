import React from "react";
import { NotificationProps } from "./NotificationWrapper";
import { TNotificationsActions } from "./useNotificationState";
declare const NotificationsContainer: React.FC<NotificationProps & {
    onSetDispatch: (disp: React.Dispatch<TNotificationsActions>) => void;
}>;
export default NotificationsContainer;
