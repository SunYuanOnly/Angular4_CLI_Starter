/**
 * Created by sy on 2017/2/4.
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
export class MachineMngService {

    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private router: Router) {
    }


    //获取应用列表
    getMachineList(machine_id: number, count: number, page_no: number): Observable<any> {
        let body = Defined.public_param();

        body.machine_id = machine_id;
        body.count = count;
        body.page_no = page_no;

        console.log('get machine_id list');
        console.log(body);
        let url = '/rest/server.machine.get_list';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    addMachine(data: any): Observable<any> {
        let body = Defined.public_param();

        body.name = data.name.value;
        body.location = data.location.value;
        body.local_ip = data.local_ip.value;
        body.public_ip = data.public_ip.value;
        body.cpu = parseInt(data.cpu.value);
        body.memory = parseInt(data.memory.value);
        body.bandwidth = parseInt(data.bandwidth.value);
        body.os = data.os.value;
        body.desc = data.desc.value;

        let url = '/rest/server.machine.add';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //修改服务器
    editMachine(data: any): Observable<any> {
        let body = Defined.public_param();

        body.id = data.id.value;
        body.name = data.name.value;
        body.location = data.location.value;
        body.local_ip = data.local_ip.value;
        body.public_ip = data.public_ip.value;
        body.cpu = parseInt(data.cpu.value);
        body.memory = parseInt(data.memory.value);
        body.bandwidth = parseInt(data.bandwidth.value);
        body.os = data.os.value;
        body.desc = data.desc.value;

        let url = '/rest/server.machine.modify';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //删除服务器
    removeMachine(machine_id: string): Observable<any> {
        let body = Defined.public_param();

        body.id = machine_id;

        console.log(body);
        let url = '/rest/server.machine.remove';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //获取默认角色

    getRoleListByMachineId(machine_id: any): Observable<any> {
        let body = Defined.public_param();

        body.machine_id = machine_id;

        console.log(body);
        let url = '/rest/server.machine.get_roles';
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);
    }

    //分配应⽤默认的⻆⾊
    setMachineRoleFuncs(machine_id: any, roles: any): Observable<any> {
        let body = Defined.public_param();

        body.machine_id = machine_id;
        body.roles = roles;

        let url = '/rest/server.machine.set_roles';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);

    }

    //根据machine_id获取服务器的主从关系
    getMachieMaster(machine_id: number): Observable<any> {
        let body = Defined.public_param();

        body.machine_id = machine_id;

        let url = '/rest/server.machine.get_master';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);

    }

    //设置服务器的主从关系
    setMachineMaster(machine_id: number, is_master: boolean, master_id: number, svr_access_token : string): Observable<any> {
        let body = Defined.public_param();

        if (is_master || machine_id == master_id) {
            body.machine_id = machine_id;
        } else {
            body.machine_id = machine_id;
            body.master_id = master_id;
            body.svr_access_token  = svr_access_token ;
        }


        let url = '/rest/server.machine.set_master';
        console.log(body);
        return this.http.post(url, body, this.options)
            .map((responseData) => Defined.extractData(responseData, this.router))
            .catch(Defined.handleError);

    }
}