import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'rssa-steps',
    templateUrl: './steps.component.html',
    styles: []
})
export class StepsComponent implements OnInit {

    constructor(public state: StateService,
                private title: Title) {
    }

    ngOnInit(): void {
        this.title.setTitle("Tutorial")
    }

    steps = [
        {
            title: "Step One",
            image: "/assets/images/steps/step_1.png",
            description: "Rate movies for the system to learn about your preferences."
        },
        {
            title: "Step Two",
            image: "/assets/images/steps/step_2.png",
            description: "The system will provide recommendations and for each you will be asked to rate the recommendation."
        },
        {
            title: "Step Three",
            image: "/assets/images/steps/step_3.png",
            description: "Lastly, you will be asked to complete a survey about your experience interacting with the system."
        }
    ]

}
