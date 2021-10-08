import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {DataHandlerService} from "../../../services/data-handler.service";
import {StateService} from "../../../services/state.service";
import {Item} from "../../../utilities/models";
import {Subscription, timer} from "rxjs";
import {options} from "../../../../environments/options";

@Component({
    selector: 'rssa-content',
    templateUrl: './content.component.html',
    styles: []
})
export class ContentComponent implements OnInit, OnDestroy {


    constructor(private api: ApiService,
                private dh: DataHandlerService,
                public state: StateService) {
    }

    items!: Item[]
    timeLeft = options.timeToInteract; // in seconds
    timerSub!: Subscription;

    ngOnInit(): void {
        // get items
        this.api.getItems({
            // todo dynamic (infinite scroll) *waiting
            page: 1,
            num_items: 16
        }).subscribe((items: Item[]) => {
            this.items = items;
        });

        // start counting down
        this.timerSub = timer(1000, 1000).subscribe(() => {
            this.timeLeft--;
        })
    }

    ngOnDestroy(): void {

        // send event data
        this.api.sendEvents({
            'events': this.dh.get('events')
        }).subscribe();

        // send preference data
        this.api.sendPreferences({
            'actual_preferences': this.dh.get('preferences')
        }).subscribe();

        // stop counting
        this.timerSub.unsubscribe();
    }

    timeFormatter(seconds: number): string {
        let minutes = Math.floor(seconds / 60);
        let remainder = seconds % 60;
        return `${minutes}:${remainder}`
    }

}
