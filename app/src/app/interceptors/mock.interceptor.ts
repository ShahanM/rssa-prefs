/***
 * @module
 *
 * Provides mock responses (for offline usage).
 */


import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


export class MockInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        // error route
        if (req.url == '/') {
            return next.handle(req)
        }

        // get items locally
        if (req.url.includes('items')) {
            return next.handle(req.clone({url: '/assets/data/items.json'}));
        }

        // default is empty response
        let res = new HttpResponse();

        return new Observable<HttpEvent<any>>(
            (subscriber) => {
                subscriber.next(res)
            })

    }


}