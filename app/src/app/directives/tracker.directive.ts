import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {broadcast} from '../utilities/broadcast.decorator';

@Directive({
    selector: '[tracker]'
})
export class TrackerDirective {

    enterTime!: number;

    constructor() {
    }

    @Output('tracker')
    trackerFn = new EventEmitter<object>()

    @HostListener('mouseenter', ['$event.timeStamp'])
    @HostListener('mouseleave', ['$event.timeStamp', '$event.target.id'])
    @broadcast('trackerFn')
    trackHover(ts: number, id?: string): any {
        // floating point precision not needed
        ts = Math.round(ts);
        if (id == undefined) {
            // `mouseleave` is called
            this.enterTime = ts;
        } else {
            // `mouseenter` is called
            let cutoff = 150 // interactions shorter than cutoff are ignored
            let duration = ts - this.enterTime;
            if (duration > cutoff) {
                return {
                    'item_id': id,
                    'event_type': 'hover',
                    'enter_time': this.enterTime,
                    'exit_time': ts,
                    'duration': duration,
                };
            }
        }
    }

    @HostListener('click', ['$event.timeStamp', '$event.path'])
    @broadcast('trackerFn')
    trackClick(ts: number, path: Array<HTMLElement>): any {
        // floating point precision not needed
        ts = Math.round(ts);
        for (let e of path) { // handle if clicked on child element
            if (e.attributes && e.attributes.getNamedItem('tracker')) {
                return {
                    'item_id': e.id,
                    'event_type': 'click',
                    'time_stamp': ts,
                };
            }
        }
    }


}
