import { ScaledSize } from 'react-native';
export default class iPhoneHelper {
    static isIphoneX(): boolean;
    static isIPhoneXSize(dim: ScaledSize): boolean;
    static isIPhoneXsSize(dim: ScaledSize): boolean;
    static isIPhone12Size(dim: ScaledSize): boolean;
    static isIPhone12MaxSize(dim: ScaledSize): boolean;
    static selectIPhone<T>(options: {
        forX: T;
        default: T;
    }): T;
}
