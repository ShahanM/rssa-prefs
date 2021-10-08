import {Component, OnInit} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'rssa-debug-bar',
    template: `
        <!-- Debug Bar -->
        <footer id="debug-bar"
                class=" py-4 bg-light w-100"
                style="position: sticky; bottom: 0">
            <div class="row no-gutters justify-content-center">
                <div class="col-lg-3 col-md-6 col-12 text-center">
                    <div class="badge badge-warning mb-2">
                        <h6 class="d-inline mx-3 font-weight-bold" *ngFor="let i of [1,2,3,4,5]"
                            (click)="state = i">{{i}}</h6>
                    </div>
                    <div class="text-muted text-center">
                        <small (click)="throwError()" class="small">Throw Error</small>
                        <small> | </small>
                        <small (click)="fillForms()" class="small">Fill Forms</small>
                        <small> | </small>
                        <small (click)="state = 4" routerLink="/app/browse" class="small">Visualizations</small>
                        <small> | </small>
                        <small (click)="printCache()" class="small">See Cache</small>
                        <small> | </small>
                        <small (click)="clearCache()" class="small">Clear Cache</small>
                    </div>
                </div>
            </div>
        </footer>
    `,
    styles: []
})
export class DebugBarComponent implements OnInit {

    constructor(public _state: StateService, private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    set state(val: number) {
        console.log(`Switched to state ${val}.`);
        this._state.state = val;
    }

    throwError() {
        this.http.get('/').subscribe(); // should return a 404
    }

    fillForms() {
        document.querySelectorAll('input').forEach(e => {
            e.checked = true;
        })
    }


    printCache() {
        console.log(localStorage);
    }

    clearCache() {
        localStorage.clear();
        console.log("Cleared Cache")
    }

}
