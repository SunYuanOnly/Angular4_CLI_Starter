/**
 * Created by sy on 2017/1/12.
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
export class DomainMngService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    // static nextCrisisId = 100;
    constructor(private http: Http, private router: Router) {
    }

    //获取domain树
    getDomainTree(): Observable<any> {
        let body = Defined.public_param();
        console.log(body);
        console.log('get domain tree ');
        let url = '/rest/system.domain.get_tree';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }


    //添加domain
    addDomain(param: any, nodeId: any): Observable<any> {
        let pid;
        if (nodeId) {
            pid = nodeId;
        } else {
            pid = 0;
        }
        let name = param.value.name;
        let desc = param.value.desc;
        let body = Defined.public_param();

        body.pid = pid;
        body.name = name;
        body.desc = desc;

        console.log(body);
        let url = '/rest/system.domain.add';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改domain
    editDomain(param: any, nodeId: any): Observable<any> {
        let id = nodeId;
        let name = param.value.name;
        let desc = param.value.desc;
        let body = Defined.public_param();

        body.id = id;
        body.name = name;
        body.desc = desc;

        let url = '/rest/system.domain.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除module
    delDomain(nodeId: any): Observable<any> {
        let body = Defined.public_param();

        body.id = nodeId;

        let url = '/rest/system.domain.remove';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

}
