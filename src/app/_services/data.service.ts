import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BadInput } from '../_common/bad-input';
import { NotFoundError } from '../_common/not-found-error';
import { AppError } from '../_common/app-error';
import { GlobalsService } from './globals.service';


export class DataService {

   // protected baseUrl: string = 'https://sendli365.com/OcrAgent/Api';
     protected baseUrl: string = this.globals.baseUrl;
    protected componentBaseUrl;

    constructor(
        private Url: string,
        protected http: HttpClient,
        protected globals: GlobalsService
        ) {

        this.componentBaseUrl = this.baseUrl + Url;

    }
   


    getAll() {
        const headers = new HttpHeaders();
        return this.http.get(`${this.componentBaseUrl}/read.php`)
            .pipe(map(response => response,
                catchError(this.handleError)));
    }

    getLookup(filterColumn?: string, filterValue?: number): Observable<any[]> {

        let obj = {};
    
        if ((typeof (filterValue) == 'undefined') || filterValue==null) {

            filterValue = 0;
        }
        if (typeof (filterColumn !== 'undefined')) {
            obj = {
                "filtercolumn": filterColumn,
                "filtervalue": filterValue,
            }
     
        }
    //   console.log(obj);
        return this.http.post(`${this.componentBaseUrl}/read.php`, JSON.stringify(obj))
            .pipe(map(response => <any[]>response,
                catchError(this.handleError)));
    }


    get(id) {
        let obj = { "id": id };

        //console.log(obj);

        return this.http.post(`${this.componentBaseUrl}/read_single.php`, JSON.stringify(obj))
            .pipe(map(response => response, catchError(this.handleError)));
    }

  


    update(object) {

        return this.http.post(`${this.componentBaseUrl}/update.php`, JSON.stringify(object))
            .pipe(map(response => response, catchError(this.handleError)));
    }

    delete(id) {
        return this.http.post(`${this.componentBaseUrl}/delete.php`, JSON.stringify({ "id": id }))
            .pipe(map(response => response, catchError(this.handleError)));
    }

    create(object) {
        return this.http.post(`${this.componentBaseUrl}/create.php`, JSON.stringify(object))
            .pipe(map(response => response, catchError(this.handleError)));
    }


    protected handleError(error: Response) {
        if (error.status === 400)
            return throwError(new BadInput(error));

        if (error.status === 404)
            return throwError(new NotFoundError());

        return throwError(new AppError(error));
    }

}