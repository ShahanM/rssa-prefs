import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

    error = new Subject<HttpErrorResponse>();
}
