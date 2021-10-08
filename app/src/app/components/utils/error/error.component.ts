import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'rssa-error',
    templateUrl: './error.component.html',
    styles: []
})
export class ErrorComponent {

    @ViewChild('errorBox')
    errorModal!: TemplateRef<any>;

    @Input('error')
    public set _error(e: HttpErrorResponse) {

        // show error message by default when in development
        this.error = {...e, show: !environment.production};
        if (this.error.message) { // can only be dismissed in production mode
            this.modal.open(this.errorModal,
                {size: 'lg', beforeDismiss: () => !environment.production});
        }
    }

    constructor(private modal: NgbModal) {
    }

    error!: HttpErrorResponse & { 'show': boolean };


}
