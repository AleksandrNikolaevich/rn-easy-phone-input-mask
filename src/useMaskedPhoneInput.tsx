import * as React from "react";
import { CountryCode, PhoneNumber, getExampleNumber, parsePhoneNumber } from "libphonenumber-js"
//@ts-ignore
import examples from 'libphonenumber-js/examples.mobile.json';
//@ts-ignore
import METADATA from 'libphonenumber-js/metadata.mobile.json';
import { TextInputProperties } from "react-native";
import Country from "./Country";


export type PhoneInputProps = {
    value: string,
    countries: CountryCode[],
    defaultCountry: CountryCode,
    onChangePhone: (value: string, args: { formatted: string, extracted: string, mask: string, country?: string, code?: string, valid: boolean }) => void,
    language?:string
}

type Handlers = {
    formatValue: (val: string | undefined) => string,
    metadata: Metadata,
    setCountryCode: (country: CountryCode) => void,
    countryCode: CountryCode,
    inputRef: (ref: any) => void,
}

type Metadata = Record<string, {
    countryCode: CountryCode,
    phoneCode: string,
    mask: string,
    inputMask: string,
    countryName: string
}>

const defaultMask = '[00000000000000]';


const getParsedMask = (example: PhoneNumber) => {
    return example
        .formatInternational()
        .replace(/-/g, " ")
        .split(" ")
        .map((item, i) => {
            const mask = item.replace(/\D/g, "").replace(/\d/g, "0");
            return i === 1 ? `([${mask}])` : `[${mask}]`
        })
}

const getCountryMaskBycode = (code: CountryCode | undefined, defaultMask: string) => {

    if (!code) return defaultMask
    const example = getExampleNumber(code, examples);
    if (!example) return defaultMask;
    const mask = getParsedMask(example);
    mask.splice(0, 1, example.countryCallingCode.toString());
    return `+${mask.join(" ")}`
}

const getMetadata = (countries: CountryCode[] | undefined, lang?: string): Metadata => {
    const metadata: Metadata = {};

    Object.keys(METADATA.country_calling_codes).forEach((phonecode) => {

        METADATA.country_calling_codes[phonecode]
            .filter((countryCode: CountryCode) => !countries || !!~countries.indexOf(countryCode))
            .forEach((countryCode: CountryCode) => {
                const mask = getCountryMaskBycode(countryCode, defaultMask);
                const inputMask = mask.split(" ").slice(1).join(" ");
                metadata[countryCode] = {
                    countryCode,
                    phoneCode: phonecode,
                    mask,
                    inputMask,
                    countryName: Country.getCountryName(countryCode)
                }
            })
    })

    return metadata;
}

const getMaskLength = (mask: string) => mask.replace(/\[/g, "").replace(/\]/g, "").length


const applyMask = (value: string, mask: string) => {
    let count = -1;
    let text = mask.replace(/0/g, (item, index) => {
        if (value.length >= count) {
            count++;
            return value.substr(count, 1)
        }
        return '';
    }).replace(/[\[,\]]/g, "").trim();
    if (/\D/.test(text[text.length - 1])) {
        text = text.slice(0, text.length - 1)
    }
    if (text.length === 1 && /\D/.test(text)) {
        return ""
    }
    return text;
}




export default function ({ value, countries, defaultCountry, onChangePhone, language }: PhoneInputProps): TextInputProperties & Handlers {

    const inputRef = React.useRef<any>();

    const [countryCode, setCountryCodeState] = React.useState<CountryCode>(defaultCountry)


    const metadata = React.useMemo(() => {
        return getMetadata(countries, language);
    }, [countries.join(",")]);

    const mask = metadata[countryCode].inputMask;
    const phoneCode = metadata[countryCode].phoneCode;

    const [maxLength, setMaxLength] = React.useState(getMaskLength(mask));

    const setCountryCode = React.useCallback((country) => {
        setCountryCodeState(country);
        setMaxLength(getMaskLength(metadata[country].inputMask))
    }, [mask])

    const formatValue = React.useCallback((raw: string | undefined = "", withCode?: boolean): string => {
        const text = raw.replace(/\D/g, "").slice(withCode ? phoneCode.length : 0);

        return applyMask(text, mask);
    }, [mask]);

    const onChangeText = React.useCallback((unmasked: string) => {
        const formatted = formatValue(unmasked);
        inputRef.current.setNativeProps({ text: formatted })
        inputRef.current.setValue && inputRef.current.setValue(formatted)
        const extracted = unmasked.replace(/\D/g, "");

        let valid = false;
        try {
            const phoneNumber = parsePhoneNumber(`${phoneCode}${extracted}`, countryCode);
            if (phoneNumber) {
                valid = phoneNumber.isValid();
            }
        } catch (e) {

        }

        onChangePhone(`+${phoneCode}${extracted}`, { 
            formatted: `+${phoneCode} ${formatted}`, 
            extracted, 
            mask: `+${phoneCode} ${mask}`, 
            country: countryCode, 
            code: `+${phoneCode}`, 
            valid 
        })
    }, [mask])

    React.useEffect(() => {
        const formatted = formatValue(value, true);
        inputRef.current.setNativeProps({ text: formatted })
        inputRef.current.setValue && inputRef.current.setValue(formatted)

    }, [mask, value])

    return {
        formatValue: (val) => formatValue(val, true),
        metadata,
        setCountryCode,
        countryCode,
        inputRef: (ref: any) => inputRef.current = ref,
        onChangeText,
        keyboardType: "number-pad",
        maxLength,
        value: formatValue(value, true)
    }
}