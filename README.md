### Description



### Installation

```sh
npm i --save @alexzunik/easy-phone-input-mask
```


#### Install require dependences

1. [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)

### Description

This set of tools makes it easy to add a mask to your text field. This is a JS only solution.

### Usage

```
import { useMaskedPhoneInput, PhoneInputProps } from "@alexzunik/rn-easy-phone-input-mask";

const PhoneField: React.FC<TextFieldProps & PhoneInputProps> = ({ value, onChangePhone, countries, defaultCountry, language, ...inputProps }) => {

    const {
        setCountryCode,
        metadata,
        countryCode,
        formatValue,
        inputRef,
        ...injectedInputProps
    } = useMaskedPhoneInput({
        onChangePhone,
        countries,
        defaultCountry,
        value,
        language
    })

    return (
        <TextField
            renderLeftAccessory={() => {
                return (
                    <TouchableOpacity onPress={() => Alert.alert("open country picker")} >
                        <Text style={{ fontSize: 16, textAlign: "center" }}>
                            +{metadata[countryCode].phoneCode}
                        </Text>
                    </TouchableOpacity>

                )
            }}
            {...inputProps}
            ref={inputRef}
            defaultValue={injectedInputProps.value}
            {...injectedInputProps}
        />
    )
}
```
