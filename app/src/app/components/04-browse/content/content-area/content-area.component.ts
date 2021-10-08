import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../utilities/models";

@Component({
    selector: 'rssa-content-area',
    templateUrl: './content-area.component.html',
    styles: []
})
export class ContentAreaComponent implements OnInit {

    @Input('contents') contents!: Item[];

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.contents);
        // todo remove
    }

}
