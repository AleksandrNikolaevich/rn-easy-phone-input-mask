import * as React from "react";
import { getExampleNumber, parsePhoneNumber } from "libphonenumber-js";
//@ts-ignore
import examples from 'libphonenumber-js/examples.mobile.json';
//@ts-ignore
import METADATA from 'libphonenumber-js/metadata.mobile.json';
import Country from "./Country";
var defaultMask = '[00000000000000]';
var getParsedMask = function (example) {
    return example
        .formatInternational()
        .replace(/-/g, " ")
        .split(" ")
        .map(function (item, i) {
        var mask = item.replace(/\D/g, "").replace(/\d/g, "0");
        return i === 1 ? "([" + mask + "])" : "[" + mask + "]";
    });
};
var getCountryMaskBycode = function (code, defaultMask) {
    if (!code)
        return defaultMask;
    var example = getExampleNumber(code, examples);
    if (!example)
        return defaultMask;
    var mask = getParsedMask(example);
    mask.splice(0, 1, example.countryCallingCode.toString());
    return "+" + mask.join(" ");
};
var getMetadata = function (countries, lang) {
    var metadata = {};
    Object.keys(METADATA.country_calling_codes).forEach(function (phonecode) {
        METADATA.country_calling_codes[phonecode]
            .filter(function (countryCode) { return !countries || !!~countries.indexOf(countryCode); })
            .forEach(function (countryCode) {
            var mask = getCountryMaskBycode(countryCode, defaultMask);
            var inputMask = mask.split(" ").slice(1).join(" ");
            metadata[countryCode] = {
                countryCode: countryCode,
                phoneCode: phonecode,
                mask: mask,
                inputMask: inputMask,
                countryName: Country.getCountryName(countryCode)
            };
        });
    });
    return metadata;
};
var getMaskLength = function (mask) { return mask.replace(/\[/g, "").replace(/\]/g, "").length; };
var applyMask = function (value, mask) {
    var count = -1;
    var text = mask.replace(/0/g, function (item, index) {
        if (value.length >= count) {
            count++;
            return value.substr(count, 1);
        }
        return '';
    }).replace(/[\[,\]]/g, "").trim();
    if (/\D/.test(text[text.length - 1])) {
        text = text.slice(0, text.length - 1);
    }
    if (text.length === 1 && /\D/.test(text)) {
        return "";
    }
    return text;
};
var getCountryCodeByPhone = function (phoneNumber) {
    var phone = phoneNumber.replace(/\D/g, "");
    var key = Object.keys(METADATA.country_calling_codes).find(function (code) { return 0 === phone.indexOf(code); });
    if (!key)
        return undefined;
    return METADATA.country_calling_codes[key][0];
};
var fullMetadata = getMetadata(undefined);
export function getMaskPlaceholder(mask) {
    return mask.replace(/[\[,\]]/g, "");
}
export function getCountryCodeByPhoneCode(code) {
    try {
        var countries = METADATA.country_calling_codes[code.replace(/\D/g, "")];
        return countries[0];
    }
    catch (e) {
    }
    return undefined;
}
export default function (_a) {
    var value = _a.value, countries = _a.countries, defaultCountry = _a.defaultCountry, onChangePhone = _a.onChangePhone, language = _a.language;
    var inputRef = React.useRef();
    var _b = React.useState(defaultCountry), countryCode = _b[0], setCountryCodeState = _b[1];
    var metadata = React.useMemo(function () {
        return getMetadata(countries, language);
    }, [countries, countries && countries.join(",")]);
    var mask = fullMetadata[countryCode].inputMask;
    var phoneCode = fullMetadata[countryCode].phoneCode;
    var _c = React.useState(getMaskLength(mask)), maxLength = _c[0], setMaxLength = _c[1];
    var setCountryCode = React.useCallback(function (country) {
        setCountryCodeState(country);
        setMaxLength(getMaskLength(fullMetadata[country].inputMask));
    }, [mask]);
    var formatValue = React.useCallback(function (raw, withCode) {
        if (raw === void 0) { raw = ""; }
        var text = raw.replace(/\D/g, "").slice(withCode ? phoneCode.length : 0);
        return applyMask(text, mask);
    }, [mask]);
    var onChangeText = React.useCallback(function (unmasked) {
        var formatted = formatValue(unmasked);
        inputRef.current.setNativeProps({ text: formatted });
        inputRef.current.setValue && inputRef.current.setValue(formatted);
        var extracted = unmasked.replace(/\D/g, "");
        var valid = false;
        try {
            var phoneNumber = parsePhoneNumber("" + phoneCode + extracted, countryCode);
            if (phoneNumber) {
                valid = phoneNumber.isValid();
            }
        }
        catch (e) {
        }
        onChangePhone(extracted ? "+" + phoneCode + extracted : '', {
            formatted: formatted ? "+" + phoneCode + " " + formatted : '',
            extracted: extracted,
            mask: "+" + phoneCode + " " + mask,
            country: countryCode,
            code: "+" + phoneCode,
            valid: valid
        });
    }, [mask]);
    React.useEffect(function () {
        var country = getCountryCodeByPhone(value);
        if (!!country && country !== countryCode) {
            setCountryCode(country);
            return;
        }
        var formatted = formatValue(value, true);
        inputRef.current.setNativeProps({ text: formatted });
        inputRef.current.setValue && inputRef.current.setValue(formatted);
    }, [mask, value, countryCode]);
    return {
        formatValue: function (val) { return formatValue(val, true); },
        metadata: metadata,
        fullMetadata: fullMetadata,
        setCountryCode: function (code) { setCountryCode(code); onChangeText(""); },
        countryCode: countryCode,
        inputRef: function (ref) { return inputRef.current = ref; },
        onChangeText: onChangeText,
        keyboardType: "number-pad",
        maxLength: maxLength,
        value: formatValue(value, true)
    };
}
