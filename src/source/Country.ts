//@ts-ignore
import en from "./en.json";
import { CountryCode } from "libphonenumber-js";


export default class Country {
    static getCountryName(iso2: CountryCode) {
        return en[iso2] || `<NotFound:${iso2}>`
    }
}
