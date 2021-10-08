import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api} from "../utilities/api.decorator";

@Injectable({
    providedIn: 'root'
})
@api({
    getItems: ['/items', 'GET'],
    sendPreferences: ['/preferences', 'PUT'],
    sendRatings: ['/ratings', 'PUT'],
    sendEvents: ['/events', 'PUT'],
    sendSurvey: ['/survey', 'PUT']
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getItems(...args: any): any {
    }

    sendPreferences(...args: any): any {
    }

    sendRatings(...args: any): any {
    }

    sendEvents(...args: any): any {
    }

    sendSurvey(...args: any): any {
    }


}
