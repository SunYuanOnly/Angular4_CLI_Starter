/**
 * Created by sy on 2017/3/07.
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
import {Defined} from './defined';

@Injectable()
export class ResetPassService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }


    //获取应用列表
    resetPassword(email: string, vcode: string, pass: string): Observable<any> {

        let body = Defined.public_param();

        body.email = email;
        body.vcode = vcode;
        body.pass = pass;

        console.log('get application list');
        console.log(body);
        let url = '/rest/account.self.user_resetpass_email';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }


}