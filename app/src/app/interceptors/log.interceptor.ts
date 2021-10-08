import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class LogInterceptor implements HttpInterceptor {

    constructor() {
    }


    intercept(req: HttpRequest<any>,
              next: HttpHandler):
        Observable<HttpEvent<any>> {

        // log all requests
        if (!environment.production) {
            console.log(req);
        }

        // log responses
        return next.handle(req).pipe(map(response => {
            if (!environment.production) {
                console.log(response)
            }
            return response;
        }))

    }


}
