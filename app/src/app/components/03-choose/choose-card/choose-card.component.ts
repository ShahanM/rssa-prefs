import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../utilities/models";

@Component({
    selector: 'rssa-choose-card',
    templateUrl: './choose-card.component.html',
    styles: []
})
export class ChooseCardComponent implements OnInit {

    @Input('item')
    set _item(i: Item) {
        this.item = {...i, show: false}
    }

    @Output('rating')
    _rating = new EventEmitter<number>();

    item!: Item & { show: boolean };
    temp = 0;
    rating = 0;


    ngOnInit(): void {
    }

    rate(value: number) {
        this._rating.emit(value);
    }



}
