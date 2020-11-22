"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
var en_json_1 = __importDefault(require("./en.json"));
var Country = /** @class */ (function () {
    function Country() {
    }
    Country.getCountryName = function (iso2) {
        return en_json_1.default[iso2] || "<NotFound:" + iso2 + ">";
    };
    return Country;
}());
exports.default = Country;
