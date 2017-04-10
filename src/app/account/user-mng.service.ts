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
export class UserMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }


    //获取应用列表
    getUserList(domain_id,user_id: string, count: number, page_no: number): Observable<any> {
        let body = Defined.public_param();

        body.domain_id = domain_id;
        body.user_id = user_id;
        body.count = count;
        body.page_no = page_no;

        console.log('get user list');
        console.log(body);
        let url = '/rest/account.user.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    addUser(data: any, roles: any,domain_id): Observable<any> {
        let body = Defined.public_param();

        body.user_id = data.id.value;
        body.domain_id = domain_id;
        body.name = data.name.value;
        body.mobile = data.mobile.value;
        body.email = data.email.value;
        body.status = parseInt(data.status.value);
        body.pass = data.pwd.value;

        body.roles = roles;

        let url = '/rest/account.user.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    editUser(data: any): Observable<any> {
        let body = Defined.public_param();

        body.user_id = data.id.value;
        body.name = data.name.value;
        body.mobile = data.mobile.value;
        body.email = data.email.value;
        body.status = parseInt(data.status.value);

        let url = '/rest/account.user.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除用户
    removeUser(user_id: string): Observable<any> {
        let body = Defined.public_param();

        body.user_id = user_id;

        console.log(body);
        let url = '/rest/account.user.remove';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //重置密码
    resetPassword(user_id: string, pass: string): Observable<any> {
        let body = Defined.public_param();

        body.user_id = user_id;
        body.pass = pass;

        console.log(body);
        let url = '/rest/account.user.reset_pass';
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
    getRoleListByUserId(user_id: any): Observable<any> {
        let body = Defined.public_param();

        body.user_id = user_id;

        console.log(body);
        let url = '/rest/account.user.get_roles';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //分配应⽤默认的⻆⾊
    setUserRoleFuncs(user_id: any, roles: any): Observable<any> {
        let body = Defined.public_param();

        body.user_id = user_id;
        body.roles = roles;

        let url = '/rest/account.user.set_roles';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);

    }
}