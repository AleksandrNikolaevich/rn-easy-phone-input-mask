import * as React from "react";
import staticProps from "hoist-non-react-statics";
import { NotificationParams } from "./types";
export declare type WithNotify<Extra = {}> = {
    notify: (params: NotificationParams<Extra>) => void;
};
export default function <P>(WrappedComponent: React.ComponentType<P>): React.FC<P> & staticProps.NonReactStatics<React.ComponentType<P>, {}>;
