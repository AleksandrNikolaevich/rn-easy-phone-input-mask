//@ts-ignore
import en from "./en.json";
var Country = /** @class */ (function () {
    function Country() {
    }
    Country.getCountryName = function (iso2) {
        return en[iso2] || "<NotFound:" + iso2 + ">";
    };
    return Country;
}());
export default Country;
