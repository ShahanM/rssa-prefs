/**
 * @module
 *
 * Keeps track of application state and user's
 * progress.
 *
 **/

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    index = new BehaviorSubject<number>(1);

    constructor() {
        // restore state if any
        let lastState: any = sessionStorage.getItem("state");
        if (lastState != null) {
            this.state = JSON.parse(lastState);
        }
    }


    next() {
        this.state = this.state + 1;
    }

    get state() {
        return this.index.getValue();
    }

    set state(value: number) {
        this.index.next(value);
        sessionStorage.setItem("state", JSON.stringify(this.state))
    }
}
