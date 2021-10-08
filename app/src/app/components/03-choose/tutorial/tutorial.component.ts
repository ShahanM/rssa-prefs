import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {options} from "../../../../environments/options";

@Component({
    selector: 'rssa-tutorial',
    template: `

        <ng-template #tutorial>
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Tutorial</h2>
                    <div class="row">
                        <div class="col-6">
                            <p>In this part of the experiment, you will rate {{itemsToRate}} movies. To rate a movie,
                                hover over it with your mouse and rate it from one to five stars. Once you have
                                rated {{itemsToRate}} movies, a continue button will appear in the right hand
                                corner.</p>

                            <button class="btn btn-primary btn-lg" (click)="dismiss()">Got it</button>
                        </div>
                        <div class="col-6">
                            <img src="/assets/images/tutorials/ratings_tutorial.gif" class="h-100" alt="">
                        </div>
                    </div>

                </div>
            </div>

        </ng-template>


    `,
    styles: []
})
export class TutorialComponent implements OnInit {

    // todo add question mark

    itemsToRate = options.itemsToRate;
    tutorialModal!: NgbModalRef;

    @ViewChild('tutorial')
    tutorialRef!: TemplateRef<any>;

    constructor(private modal: NgbModal) {

    }

    ngOnInit(): void {
        setTimeout(() => {
            this.tutorialModal = this.modal.open(this.tutorialRef, {size: 'lg'});
        }, 300)
    }

    dismiss() {
        if (this.tutorialRef) {
            this.tutorialModal.close();
        }
    }

}
