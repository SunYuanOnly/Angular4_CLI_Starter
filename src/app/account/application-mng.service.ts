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
export class ApplicationMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }


    //获取应用列表
    getApplicationList(domain_id: string, count: number, page_no: number): Observable<any> {

        let body = Defined.public_param();

        body.domain_id = domain_id;
        body.count = count;
        body.page_no = page_no;

        console.log('get application list');
        console.log(body);
        let url = '/rest/account.application.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    addApplication(domain_id: string, data: any): Observable<any> {

        let body = Defined.public_param();

        body.domain_id = domain_id;
        body.name = data.name.value;
        body.status = parseInt(data.status.value);

        let url = '/rest/account.application.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    editApplication(data: any): Observable<any> {
        let body = Defined.public_param();

        body.id = data.id.value;
        body.name = data.name.value;
        body.status = parseInt(data.status.value);

        let url = '/rest/account.application.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除应用
    removeApplication(id: string): Observable<any> {
        let body = Defined.public_param();

        body.id = id;

        let url = '/rest/account.application.remove';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //重置应用
    resetApplication(id: string): Observable<any> {
        let body = Defined.public_param();

        body.id = id;

        let url = '/rest/account.application.reset';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //获取domain树
    getDomainTree(): Observable<any> {
        let body = Defined.public_param();
        console.log('get domain tree ');
        let url = '/rest/system.domain.get_tree';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }


    //获取默认角色

    getRoleList(app_id: any, domain_id: any): Observable<any> {
        let body = Defined.public_param();

        body.app_id = app_id;
        body.domain_id = domain_id;

        console.log(body);
        let url = '/rest/account.application.get_roles';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //分配应⽤默认的⻆⾊
    setAppRoleFuncs(app_id: any, roles: any): Observable<any> {
        let body = Defined.public_param();

        body.app_id = app_id;
        body.roles = roles;

        let url = '/rest/account.application.set_roles';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);

    }


    //获取模版类型列表
    getTemplateTypeList(): Observable<any> {
        let body = Defined.public_param();

        console.log('get template_type list');
        console.log(body);
        let url = '/rest/system.template_type.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //获取模版列表
    getTemplateList(template_type_id: string, app_id: number): Observable<any> {
        let body = Defined.public_param();

        body.app_id = app_id;
        body.template_type_id = template_type_id;

        console.log('get template list');
        console.log(body);
        let url = '/rest/server.template.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //添加模版
    addTemplate(app_id: number, template_type_id: string, data: any): Observable<any> {

        let body = Defined.public_param();

        body.app_id = app_id;
        body.template_type_id = template_type_id;
        body.lang_id = data.lang_id.value;
        body.content = data.content.value;

        let url = '/rest/server.template.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改模版信息
    editTemplate(app_id: number, template_type_id: string, data: any): Observable<any> {

        let body = Defined.public_param();

        body.app_id = app_id;
        body.template_type_id = template_type_id;
        body.lang_id = data.lang_id.value;
        body.content = data.content.value;

        let url = '/rest/server.template.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除模版
    removeTemplate(app_id: number, template_type_id: string, lang_id: string): Observable<any> {

        let body = Defined.public_param();

        body.app_id = app_id;
        body.template_type_id = template_type_id;
        body.lang_id = lang_id;


        let url = '/rest/server.template.remove';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }
}