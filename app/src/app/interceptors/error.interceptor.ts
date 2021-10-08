/***
 * @module
 *
 * Calls error handler on HTTP Errors.
 */


import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {ErrorService} from "../services/error.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService) {
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler):
        Observable<HttpEvent<any>> {


        return next.handle(req).pipe
        (catchError((err, caught) => {
            this.errorService.error.next(err);
            throw err;
        }));

    }


}
