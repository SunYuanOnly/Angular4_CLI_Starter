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
export class TemplateTypeMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }

    //获取角色列表
    getTemplateTypeList(): Observable<any> {
        let body = Defined.public_param();

        console.log('get template_type list');
        console.log(body);

        let url = '/rest/system.template_type.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //添加语言类别
    addTemplateType(data: any): Observable<any> {
        let body = Defined.public_param();


        body.id = data.id.value;
        body.name = data.name.value;

        let url = '/rest/system.template_type.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改语言信息
    editTemplateType(data: any): Observable<any> {
        let body = Defined.public_param();

        body.id = data.id.value;
        body.name = data.name.value;

        let url = '/rest/system.template_type.modify';
        console.log(body);

        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除语言信息
    removeTemplateType(id: string): Observable<any> {
        let body = Defined.public_param();

        body.id = id;

        let url = '/rest/system.template_type.remove';
        console.log(body);

        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }
}