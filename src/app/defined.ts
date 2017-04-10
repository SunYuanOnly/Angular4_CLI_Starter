/**
 * Created by cg on 2017/1/10.
 */
import {Router} from '@angular/router';
import {Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Defined {
    static Unauthorized = 11000;     //没有登录
    static Forbidden = 11001;        //没有权限
    static OK = 10000;
    static body = {
        v: '6.0',
        app_key: 'C767115F-0ED0-0001-3451-1DC0D520ECB0',
        app_pass: '9aaa8e3fea97081839f7515cb3426359',
    };

    static public_param() {
        this.body['access_token'] = sessionStorage.getItem('access_token');
        return JSON.parse(JSON.stringify(this.body));
    }

    static extractData(res: Response, router: Router) {
        console.log('extractData status: ' + res.status);
        let body = res.json() || {};
        if (body.code == Defined.Unauthorized) {
            sessionStorage.setItem('login', '0');
            router.navigate(['/login']);

            return {};
        }

        return body;
    }

    static handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        alert(errMsg);
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    static ByCodeMsg(obj: any): void {
        let str = "";

        switch (obj.code) {
            case 10001:
                str = "重复插入数据！";
                break;
            case this.Unauthorized:
                str = "尚未登录！";
                break;
            case this.Forbidden:
                str = "没有权限！";
                break;
            case 11100:
                str = "内部错误！";
                break;
            case 11103:
                str = "请求的参数错误！";
                break;
            case 10002:
                str = "数据被引用，不能删除！";
                break;
        }


    }


}
