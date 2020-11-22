var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./source/en.json"], function (require, exports, en_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    en_json_1 = __importDefault(en_json_1);
    var Country = /** @class */ (function () {
        function Country() {
        }
        Country.getCountryName = function (iso2) {
            //@ts-ignore
            return en_json_1.default[iso2] || "<NotFound:" + iso2 + ">";
        };
        return Country;
    }());
    exports.default = Country;
});
