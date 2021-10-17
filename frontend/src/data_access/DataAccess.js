import { reactLocalStorage } from 'reactjs-localstorage';

export default class DataAccess {

    constructor({
        key,
        default_value }) {
        this.key = key;
        this.default_value = default_value;
    }

    load(parse = true) {
        const result = reactLocalStorage.get(this.key, this.default_value);
        if (!parse) {
            return result;
        }
        return JSON.parse(result)
    }

    save(value, serialize = true) {
        if (serialize) {
            reactLocalStorage.set(this.key, JSON.stringify(value));
            return;
        }
        reactLocalStorage.set(this.key, value);
    }
}