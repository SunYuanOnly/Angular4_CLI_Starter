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
export class FunMngService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    // static nextCrisisId = 100;
    constructor(private http: Http, private router: Router) {
    }

    //获取module树
    getModuleTree(): Observable<any> {
        let body = Defined.public_param();
        console.log('get module tree ');
        console.log(body);
        let url = '/rest/system.module.get_tree';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    /*
     * getFunItem 获取功能项
     * module_id  模块id
     */
    getFunItem(module_id): Observable<any> {
        let body = Defined.public_param();

        body.module_id = module_id;

        console.log(body);
        let url = '/rest/system.function.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //添加module
    addModule(param: any, nodeId: any): Observable<any> {
        let body = Defined.public_param();

        body.pid = nodeId;
        body.tag = param.tag.value;
        body.name = param.name.value;
        body.ui_show = param.ui_show.value;

        let url = '/rest/system.module.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改module
    editModule(param: any, nodeId: any): Observable<any> {
        let body = Defined.public_param();

        body.id = nodeId;
        body.tag = param.value.tag;
        body.name = param.value.name;
        body.ui_show = param.value.ui_show;

        let url = '/rest/system.module.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除module
    delModule(nodeId: any): Observable<any> {
        let body = Defined.public_param();

        body.id = nodeId;

        let url = '/rest/system.module.remove';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //添加功能项
    addFunItem(param: any, nodeId: any): Observable<any> {
        let body = Defined.public_param();

        body.module_id = nodeId;
        body.tag = param.tag.value;
        body.name = param.name.value;
        body.rw = param.rw.value;
        body.check_auth = param.check_auth.value;

        let url = '/rest/system.function.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改功能项
    editFunItem(param: any): Observable<any> {
        let body = Defined.public_param();

        body.id = param.value.id;
        body.tag = param.value.tag;
        body.name = param.value.name;
        body.rw = parseInt(param.value.rw);
        body.check_auth = param.value.check_auth;

        let url = '/rest/system.function.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除功能项
    delFunItem(itemId: any): Observable<any> {
        let body = Defined.public_param();

        body.id = itemId;

        let url = '/rest/system.function.remove';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

}
