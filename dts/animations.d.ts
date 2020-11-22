import Animated, { Value, Clock } from "react-native-reanimated";
export declare function runSpring(clock: Clock, value: Value<number>, velocity: Value<number>, dest: Animated.Node<number>, close: Animated.Node<number>): Animated.Node<number>[];
declare type TConfig = {
    duration: number;
    toValue: Animated.Value<number>;
    lastVal: Animated.Value<number>;
};
export declare function runTiming(clock: Animated.Clock): ({ duration, toValue, lastVal }: TConfig) => Animated.Node<number>;
export {};
