import {Deserializer} from 'json-object-mapper';

export class MapDeserializer implements Deserializer {
    deserialize = (value: any): any => {
        let mapToReturn: Map<String, String> = new Map<String, String>();
        if (value) {
            Object.keys(value).forEach((key: String) => {
                mapToReturn.set(key, value['' + key]);
            });
        }
        return mapToReturn;
    }
}