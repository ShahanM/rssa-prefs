import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StateService} from "../services/state.service";
import {environment} from "../../environments/environment"
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../services/error.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'rssa-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {



    constructor(private errorService: ErrorService,) {}


    debug = !environment.production;
    error!: HttpErrorResponse;

    ngOnInit() {

        // error handling
        this.errorService.error.subscribe((err) => {
            if (this.debug) {
                console.log(err)
            }
            this.error = err;
        })
    }




}
