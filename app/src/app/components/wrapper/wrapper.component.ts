import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {Title} from "@angular/platform-browser";
import {steps} from "./steps";

@Component({
    selector: 'rssa-wrapper',
    templateUrl: './wrapper.component.html',
    styles: []
})
export class Wrapper implements OnInit {

    constructor(public state: StateService,
                private title: Title) {
    }


    steps = steps;
    ngOnInit(): void {
        this.title.setTitle('Browse')
    }



}
