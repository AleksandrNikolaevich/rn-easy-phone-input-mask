var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./useMaskedPhoneInput", "./useMaskedPhoneInput"], function (require, exports, useMaskedPhoneInput_1, useMaskedPhoneInput_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useMaskedPhoneInput = void 0;
    useMaskedPhoneInput_1 = __importDefault(useMaskedPhoneInput_1);
    __exportStar(useMaskedPhoneInput_2, exports);
    exports.useMaskedPhoneInput = useMaskedPhoneInput_1.default;
});