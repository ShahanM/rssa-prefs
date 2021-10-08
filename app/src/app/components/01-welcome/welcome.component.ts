import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StateService} from "../../services/state.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'rssa-welcome',
    templateUrl: './welcome.component.html',
    styles: []
})
export class WelcomeComponent implements OnInit {

    constructor(public modal: NgbModal,
                private state: StateService,
                private title: Title) {
    }

    checkBox: any;

    ngOnInit(): void {
        this.title.setTitle("Welcome")
    }

    show(e: TemplateRef<any>) {
        this.modal.open(e, {size: 'xl'})
    }

    onSubmit() {
        this.state.next();
        this.modal.dismissAll();
    }


}
