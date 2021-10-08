import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[rssaFade]'
})
export class CardFadeDirective implements OnInit {

    @Input('rssaFade') showTime: number = 0;
    @HostBinding('style.opacity') opacity: number = 0;

    ngOnInit() {
        this.opacity = 0;
        setTimeout(() => {
            this.opacity = 100;
        }, this.showTime * 1000)
    }


}
