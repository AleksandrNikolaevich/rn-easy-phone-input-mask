import * as React from "react";
import { ImageSourcePropType, TextStyle } from "react-native";
import { NotificationActions, NotificationParams } from "./types";
export declare type NotificationExtra = {
    icon?: any;
    buttons?: {
        title?: string | React.ReactNode;
        icon?: ImageSourcePropType;
        onPress: () => any;
        titleStyle?: TextStyle;
    }[];
};
declare const Notification: React.FC<NotificationActions & NotificationParams<NotificationExtra>>;
export default Notification;
