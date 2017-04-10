/**
 * Created by sy on 2017/3/08.
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
export class ChlTypeMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }

    //获取通道列表
    getChlTypeList(): Observable<any> {
        let body = Defined.public_param();

        console.log('get device_type list');
        console.log(body);
        let url = '/rest/device.chltype.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }
    //添加通道类别
    addChlType(data: any): Observable<any> {
        let body = Defined.public_param();


        body.id = data.id.value;
        body.name = data.name.value;

        let url = '/rest/device.chltype.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改通道信息
    editChlType(data: any): Observable<any> {
        let body = Defined.public_param();

        body.id = data.id.value;
        body.name = data.name.value;

        let url = '/rest/device.chltype.modify';
        console.log(body);

        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除通道信息

    removeChlType(id: string): Observable<any> {
        let body = Defined.public_param();

        body.id = id;

        let url = '/rest/device.device_type.remove';
        console.log(body);

        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }
}