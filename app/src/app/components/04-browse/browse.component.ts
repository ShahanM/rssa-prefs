import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";

@Component({
    selector: 'rssa-browse',
    templateUrl: './browse.component.html',
    styles: []
})
export class BrowseComponent implements OnInit {

    constructor(public state: StateService) {
    }

    ngOnInit(): void {
    }

}
