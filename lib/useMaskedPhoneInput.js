"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCodeByPhoneCode = exports.getMaskPlaceholder = void 0;
var React = __importStar(require("react"));
var libphonenumber_js_1 = require("libphonenumber-js");
//@ts-ignore
var examples_mobile_json_1 = __importDefault(require("libphonenumber-js/examples.mobile.json"));
//@ts-ignore
var metadata_mobile_json_1 = __importDefault(require("libphonenumber-js/metadata.mobile.json"));
var Country_1 = __importDefault(require("./Country"));
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
    var example = libphonenumber_js_1.getExampleNumber(code, examples_mobile_json_1.default);
    if (!example)
        return defaultMask;
    var mask = getParsedMask(example);
    mask.splice(0, 1, example.countryCallingCode.toString());
    return "+" + mask.join(" ");
};
var getMetadata = function (countries, lang) {
    var metadata = {};
    Object.keys(metadata_mobile_json_1.default.country_calling_codes).forEach(function (phonecode) {
        metadata_mobile_json_1.default.country_calling_codes[phonecode]
            .filter(function (countryCode) { return !countries || !!~countries.indexOf(countryCode); })
            .forEach(function (countryCode) {
            var mask = getCountryMaskBycode(countryCode, defaultMask);
            var inputMask = mask.split(" ").slice(1).join(" ");
            metadata[countryCode] = {
                countryCode: countryCode,
                phoneCode: phonecode,
                mask: mask,
                inputMask: inputMask,
                countryName: Country_1.default.getCountryName(countryCode)
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
function getMaskPlaceholder(mask) {
    return mask.replace(/[\[,\]]/g, "");
}
exports.getMaskPlaceholder = getMaskPlaceholder;
function getCountryCodeByPhoneCode(code) {
    try {
        var countries = metadata_mobile_json_1.default.country_calling_codes[code.replace(/\D/g, "")];
        return countries[0];
    }
    catch (e) {
    }
    return undefined;
}
exports.getCountryCodeByPhoneCode = getCountryCodeByPhoneCode;
function default_1(_a) {
    var value = _a.value, countries = _a.countries, defaultCountry = _a.defaultCountry, onChangePhone = _a.onChangePhone, language = _a.language;
    var inputRef = React.useRef();
    var _b = React.useState(defaultCountry), countryCode = _b[0], setCountryCodeState = _b[1];
    var metadata = React.useMemo(function () {
        return getMetadata(countries, language);
    }, [countries, countries && countries.join(",")]);
    var mask = metadata[countryCode].inputMask;
    var phoneCode = metadata[countryCode].phoneCode;
    var _c = React.useState(getMaskLength(mask)), maxLength = _c[0], setMaxLength = _c[1];
    var setCountryCode = React.useCallback(function (country) {
        setCountryCodeState(country);
        setMaxLength(getMaskLength(metadata[country].inputMask));
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
            var phoneNumber = libphonenumber_js_1.parsePhoneNumber("" + phoneCode + extracted, countryCode);
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
        var formatted = formatValue(value, true);
        inputRef.current.setNativeProps({ text: formatted });
        inputRef.current.setValue && inputRef.current.setValue(formatted);
    }, [mask, value]);
    return {
        formatValue: function (val) { return formatValue(val, true); },
        metadata: metadata,
        setCountryCode: setCountryCode,
        countryCode: countryCode,
        inputRef: function (ref) { return inputRef.current = ref; },
        onChangeText: onChangeText,
        keyboardType: "number-pad",
        maxLength: maxLength,
        value: formatValue(value, true)
    };
}
exports.default = default_1;
