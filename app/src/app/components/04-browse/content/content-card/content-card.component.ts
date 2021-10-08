import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../utilities/models";
import {DataHandlerService} from "../../../../services/data-handler.service";

@Component({
    selector: 'rssa-content-card',
    templateUrl: './content-card.component.html',
    styles: []
})
export class ContentCardComponent implements OnInit {

    constructor(public ds: DataHandlerService) {
    }


    @Input('item')
    set _item(i:Item) {
        this.item = {...i, show: false}
    }


    item!: Item & { show: boolean };

    ngOnInit(): void {
    }

}
