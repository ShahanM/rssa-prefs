/**
 *
 *
 *
 */

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    constructor() {
    }


    get(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }

    set(key: string, value: object) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }

    add(key: string, value: object) {
        if (this.get(key) == undefined) {
            this.set(key, []);
        }
        let items = this.get(key);
        items.push(value);
        this.set(key, items)
    }


}
