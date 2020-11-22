"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var en_json_1 = __importDefault(require("./source/en.json"));
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
