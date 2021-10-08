/***
 * @module
 *
 * Prevents /app from being activated unless on
 * a valid state.
 */


import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {StateService} from "./state.service";
import {Injectable} from "@angular/core";

@Injectable({
    'providedIn': 'root'
})
export class AppGuard implements CanActivate {

    constructor(private state: StateService, private router: Router) {
    }

    validState = 4;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.state.state == this.validState || this.router.createUrlTree(['/']);
    }

}