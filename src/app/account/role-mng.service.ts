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
export class RoleMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
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

    //获取角色列表
    getRoleList(domain_id): Observable<any> {
        let body = Defined.public_param();

        body.domain_id = domain_id;


        console.log('get role list');
        console.log(body);
        let url = '/rest/account.role.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
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

    addRole(data: any, id: any): Observable<any> {
        let body = Defined.public_param();

        body.domain_id = id;
        body.role_id = data.id.value;
        body.role_name = data.name.value;

        let url = '/rest/account.role.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    editRole(data: any): Observable<any> {
        let body = Defined.public_param();

        body.role_id = data.id.value;
        body.role_name = data.name.value;

        let url = '/rest/account.role.modify';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    removeRole(id: string): Observable<any> {
        let body = Defined.public_param();

        body.role_id = id;

        let url = '/rest/account.role.remove';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    getMethodItem(module_id, role_id): Observable<any> {
        let body = Defined.public_param();

        body.role_id = role_id;
        body.module_id = module_id;

        let url = '/rest/account.role.get_funcs';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    setRoleFuncs(role_id, funcs: any): Observable<any> {
        let body = Defined.public_param();

        body.role_id = role_id;
        body.funcs = funcs;

        let url = '/rest/account.role.set_funcs';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

}