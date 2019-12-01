"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapDeserializer {
    constructor() {
        this.deserialize = (value) => {
            let mapToReturn = new Map();
            if (value) {
                Object.keys(value).forEach((key) => {
                    mapToReturn.set(key, value['' + key]);
                });
            }
            return mapToReturn;
        };
    }
}
exports.MapDeserializer = MapDeserializer;
