import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'rssa-resize-modal',
    template: `
        <ng-template #resizeModal>
            <div class="card bg-dark">
                <div class="card-body">
                    <h4 class="text-light font-weight-bold">
                        Your browser window is too small. Please resize it so that the content can properly fit.
                        This message will disappear once the window is large enough.
                    </h4>
                </div>
            </div>
        </ng-template>
    `,
    styles: []
})
export class ResizeModalComponent implements OnInit, AfterViewInit {


    @ViewChild('resizeModal')
    resizeModal!: ElementRef;

    @HostListener('window:resize')
    onResize() {
        let minWindowSize = 1000;
        let validSize = () => window.innerWidth >= minWindowSize;
        if (!validSize()) {
            if (!this.modal.hasOpenModals()) {
                this.activeModal = this.modal.open(this.resizeModal, {
                    size: "lg", beforeDismiss: validSize
                });
            }
        } else {
            if (this.activeModal) {
                this.activeModal.close();
            }
        }
    }

    activeModal!: NgbModalRef;


    constructor(private modal: NgbModal) {
    }

    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        // check size on start
        this.onResize();
    }

}
