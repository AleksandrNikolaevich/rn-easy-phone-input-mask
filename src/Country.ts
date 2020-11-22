import en from "./source/en.json";
import { CountryCode } from "libphonenumber-js";


export default class Country {
    static getCountryName(iso2: CountryCode) {
        //@ts-ignore
        return en[iso2] || `<NotFound:${iso2}>`
    }
}
