import Animated from "react-native-reanimated";
import { TapGestureHandlerStateChangeEvent } from "react-native-gesture-handler";
export declare enum NotificationType {
    error = "error",
    success = "success",
    info = "info"
}
export declare type NotificationParams<TData = any> = {
    title: string;
    message?: string;
    type?: NotificationType;
    timeout?: number;
    data?: TData;
    onPress?: () => void;
    heightAnimation?: Animated.Value<number>;
    theme?: NotificationTheme;
    opacity?: Animated.Node<number>;
};
export declare type NotificationActions = {
    close: () => void;
};
export declare type CloseButtonProps = {
    fullState: Animated.Value<number>;
    onPress: (event: TapGestureHandlerStateChangeEvent) => void;
};
export declare type NotificationTheme = "light" | "dark";
