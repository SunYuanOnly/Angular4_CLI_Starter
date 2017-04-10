/**
 * Created by cg on 2017/1/10.
 */
import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Headers, RequestOptions} from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {Defined} from './defined';

@Injectable()
export class LoginService {

    private loginUrl = '/rest/login';  // URL to web API
    constructor(private http: Http) {

    }

    login(username, password): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        // let body = {username: username, password: password};

        let body = Defined.public_param();

        body.username = username;
        body.password = password;

        console.log(body);

        return this.http.post(this.loginUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log(res);
        let body;
        if (res.status == 200) {
            body = res.json() || {};
        }
        else {
            body = {};
        }
        body.resStatus = res.status;
        return body;
    }

    private handleError(error: Response | any) {
        return error;
    }

}