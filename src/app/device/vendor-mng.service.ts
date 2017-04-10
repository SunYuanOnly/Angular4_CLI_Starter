/**
 * Created by cg on 2017/2/4.
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';


import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import {Defined} from '../defined';

@Injectable()
export class VendorMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }


    //获取厂家列表
    getVendorList(): Observable<any> {
        let body = Defined.public_param();
        console.log('get vendor list');
        console.log(body);
        let url = '/rest/device.vendor.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    addVendor(data: any): Observable<any> {
        let body = Defined.public_param();

        body.id = data.id.value;
        body.name = data.name.value;

        console.log(body);
        let url = '/rest/device.vendor.add';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    editVendor(data: any): Observable<any> {
        let body = Defined.public_param();

        body.id = data.id.value;
        body.name = data.name.value;

        console.log(body);
        let url = '/rest/device.vendor.modify';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    removeVendor(id: string): Observable<any> {
        let body = Defined.public_param();

        body.id = id;

        console.log(body);
        let url = '/rest/device.vendor.remove';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

}