import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../services/api.service";
import {Item} from "../../utilities/models";
import {DataHandlerService} from "../../services/data-handler.service";
import {options} from "../../../environments/options";

@Component({
    selector: 'rssa-choose',
    templateUrl: './choose.component.html',

})
export class ChooseComponent implements OnInit, OnDestroy, AfterViewInit {


    items: Array<Item> = [];
    subtitle!: HTMLElement;

    numItemsLeft = options.itemsToRate
    page = 0;
    itemsPerPage = 18; // six on each row


    ratings: { [key: string]: number } = {}
    loading = false;

    constructor(private title: Title,
                public state: StateService,
                public dh: DataHandlerService,
                private api: ApiService
    ) {
    }


    // infinite scrolling
    @HostListener('window:scroll')
    onScroll() {
        if (document.body.clientHeight - window.scrollY < 1200) {
            if (!this.loading) {
                this.fetchItems();
            }
        }
    }

    ngOnInit(): void {
        this.title.setTitle("Explore");

        // get items
        this.fetchItems();

    }

    ngAfterViewInit() {
        this.subtitle = <HTMLElement>document.getElementById('page-subtitle');
        this.subtitle.innerText = `Rate ${this.numItemsLeft} movies`;
    }


    ngOnDestroy() {
        // send data when module unloaded
        this.api.sendRatings({
            'ratings': Object.keys(this.ratings).map(k => ({
                'item_id': k,
                'rating': this.ratings[k]
            }))
        }).subscribe((value: any) => {
            this.dh.remove('ratings');
            this.dh.set('preferences', value);
        })
    }


    fetchItems() {

        this.loading = true;
        this.page += 1;

        this.api.getItems({
            page: this.page,
            num_items: this.itemsPerPage
        }).subscribe((items: Array<Item>) => {
            this.items = this.items.concat(items);
            this.loading = false;
        })

    }

    addRating(item_id: string, rating: number) {

        // if new rating
        if (!(item_id in this.ratings)) {
            this.numItemsLeft--;
            this.updateSubtitle();
        }

        // add rating
        this.ratings[item_id] = rating;

        // for debugging
        this.dh.set('ratings', this.ratings)

    }

    updateSubtitle() {
        this.subtitle.innerText = this.numItemsLeft > 0 ?
            "Rate " + this.numItemsLeft + " more movies" :
            "You can proceed to the next step (or keep rating)";
    }


}
