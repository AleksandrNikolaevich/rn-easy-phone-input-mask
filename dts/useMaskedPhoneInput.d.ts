import { CountryCode } from "libphonenumber-js";
import { TextInputProperties } from "react-native";
export declare type PhoneInputProps = {
    value: string;
    countries?: CountryCode[];
    defaultCountry: CountryCode;
    onChangePhone: (value: string, args: {
        formatted: string;
        extracted: string;
        mask: string;
        country?: string;
        code?: string;
        valid: boolean;
    }) => void;
    language?: string;
};
declare type Handlers = {
    formatValue: (val: string | undefined) => string;
    metadata: Metadata;
    setCountryCode: (country: CountryCode) => void;
    countryCode: CountryCode;
    inputRef: (ref: any) => void;
};
declare type Metadata = Record<string, {
    countryCode: CountryCode;
    phoneCode: string;
    mask: string;
    inputMask: string;
    countryName: string;
}>;
export default function ({ value, countries, defaultCountry, onChangePhone, language }: PhoneInputProps): TextInputProperties & Handlers;
export {};
