import { NotificationParams } from "./types";
declare type NotifyHandle<T> = (parmas: NotificationParams<T>) => void;
export default function <T = any>(): NotifyHandle<T> & {
    error: NotifyHandle<T>;
    success: NotifyHandle<T>;
    info: NotifyHandle<T>;
};
export {};
