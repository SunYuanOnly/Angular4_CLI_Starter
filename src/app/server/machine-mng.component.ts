/**
 * Created by cg on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';
import {MachineMngService} from "./machine-mng.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
    templateUrl: 'machine-mng.component.html',
    styles: [`
        .red{color:red;}
        .ellipsis{
          white-space:nowrap; 
          overflow:hidden; 
          text-overflow:ellipsis;
          max-width: 106px;
          cursor: pointer;
         }
         .rotate{
            transform:rotate(-45deg);
            -webkit-transform:rotate(-45deg);
            -o-transform:rotate(-45deg);
            -ms-transform:rotate(-45deg);
            -moz-transform:rotate(-45deg);
         }
`]
})
export class MachineMngComponent implements OnInit {

    public error: any;
    public machine_info: FormGroup;
    public machine_list: any;
    public machine_id = "";
    public modalTarget: any;
    public globelMsg: any;
    public msgShow: boolean;
    public domain_tree: any;
    public role_list: any;
    public temp_roles = [];
    public roles = [];
    public changeJson = [];
    public page_no: number = 1;
    public count: number = 5;
    public total: number;
    public serarch_id = "";
    public is_master: boolean = false;
    public master_id: number;
    public svr_access_token: string = "";
    public changeDisabled: boolean = false;
    public select_machine_list = [];

    constructor(public service: MachineMngService, public fbld: FormBuilder) {
        this.machine_info = fbld.group({
            id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            location: ['', [Validators.required]],
            local_ip: ['', [Validators.required]],
            public_ip: ['', [Validators.required]],
            cpu: ['', [Validators.required]],
            memory: ['', [Validators.required]],
            bandwidth: ['', [Validators.required]],
            os: ['', [Validators.required]],
            desc: ['', [Validators.required]]
        });
    }

    //初始化
    ngOnInit(): void {
        this.getMachineList("", this.count, 1);
    }

    //获取物理服务器列表
    getMachineList(machine_id: any, count: number, page_no: number): void {
        console.log(machine_id);
        this.service.getMachineList(machine_id, count, page_no).subscribe(
            machine_list => {
                if (machine_list.code == Defined.OK) {
                    this.machine_list = machine_list.machines;
                    // this.page_no = user_list.page_no;
                    this.total = machine_list.total;
                }
            },
            error => {
                let machines = [
                    {
                        'id': 1,
                        'name': '服务器1',
                        'location': '阿里云华东1',
                        'local_ip': '10.1.1.100',
                        'public_ip': '218.15.1.22',
                        'cpu': 1,
                        'memory': 2048,
                        'bandwidth': 5,
                        'os': 'centos7.1 64bit',
                        'desc': 'test1'
                    },
                    {
                        'id': 2,
                        'name': '服务器2',
                        'location': '阿里云华东1',
                        'local_ip': '10.1.1.100',
                        'public_ip': '218.15.1.22',
                        'cpu': 1,
                        'memory': 2048,
                        'bandwidth': 5,
                        'os': 'centos7.1 64bit',
                        'desc': 'test2'
                    },

                    {
                        'id': 3,
                        'name': '服务器3',
                        'location': '阿里云华东1',
                        'local_ip': '10.1.1.100',
                        'public_ip': '218.15.1.22',
                        'cpu': 1,
                        'memory': 2048,
                        'bandwidth': 5,
                        'os': 'centos7.1 64bit',
                        'desc': 'test2'
                    },

                    {
                        'id': 4,
                        'name': '服务器4',
                        'location': '阿里云华东1',
                        'local_ip': '10.1.1.100',
                        'public_ip': '218.15.1.22',
                        'cpu': 1,
                        'memory': 2048,
                        'bandwidth': 5,
                        'os': 'centos7.1 64bit',
                        'desc': 'test2'
                    }

                ];
                this.machine_list = machines;

                this.error = error
            }
        );
    }

    //通过id查询服务器
    searchMachine(id: any): void {
        //console.log(id);
        let machine_id = parseInt(id);
        this.getMachineList(machine_id, this.count, 1);
    }

    //添加服务器
    addMachine(): void {
        let machineData = this.machine_info.controls;


        // data['status'].value = this.curr_app_status;
        this.service.addMachine(machineData).subscribe(
            result => {

                if (result.code == 10000) {

                    this.globelMsg = "添加成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.resetMachineInfo();
                    this.getMachineList("", this.count, 1);

                } else {
                    this.globelMsg = Defined.ByCodeMsg(result);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error;
            }
        );

    }

    //修改服务器
    editMachine(): void {
        let machineData = this.machine_info.controls;
        // data['status'].value = this.curr_app_status;
        this.service.editMachine(machineData).subscribe(
            result => {

                if (result.code == 10000) {

                    this.globelMsg = "修改成功！";

                    this.resetMachineInfo();

                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getMachineList("", this.count, 1);

                } else {
                    this.globelMsg = Defined.ByCodeMsg(result);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error
            }
        );
    }

    //删除服务器
    removeMachine(machine_id: string): void {
        this.service.removeMachine(machine_id).subscribe(
            result => {
                if (result.code == 10000) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getMachineList("", this.count, 1);
                } else {
                    this.globelMsg = Defined.ByCodeMsg(result);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error
            }
        );
    }

    //500毫秒隐藏modal
    setTimeOut(): void {
        let me = this;
        //500毫秒隐藏modal
        setTimeout(function () {
            me.modalTarget.hide();
            me.globelMsg = "";
            me.msgShow = false;
        }, 500);
    }

    openModal(target, data, type): void {
        if (data) {
            this.machine_info = this.fbld.group({
                id: [data.id, [Validators.required]],
                name: [data.name, [Validators.required]],
                location: [data.location, [Validators.required]],
                local_ip: [data.local_ip, [Validators.required]],
                public_ip: [data.public_ip, [Validators.required]],
                cpu: [data.cpu, [Validators.required]],
                memory: [data.memory, [Validators.required]],
                bandwidth: [data.bandwidth, [Validators.required]],
                os: [data.os, [Validators.required]],
                desc: [data.desc, [Validators.required]]
            });
            this.machine_id = data.id;
        }
        if (type != "" && type == "setRole") {
            this.getRoleListByMachineId();
        } else if (type != "" && type == "setMaster") {
            this.getMachieMaster(data.id);

        }

        this.modalTarget = target;

        target.show();

    }

    getRoleListByMachineId(): void {

        let machine_id = this.machine_id;

        this.service.getRoleListByMachineId(machine_id).subscribe(
            role_list => {
                if (role_list.code == Defined.OK) {
                    this.role_list = role_list.roles;
                    let changeArr = this.changeJson;
                    if (changeArr.length) {
                        for (var i = 0; i < changeArr.length; i++) {
                            console.log(changeArr[i].id);
                            for (var j = 0; j < this.role_list.length; j++) {
                                if (this.role_list[j].id == changeArr[i].id) {
                                    this.role_list[j].enabled = changeArr[i].enabled
                                }
                            }
                        }
                    }
                }

            },
            error => {
                this.role_list = [
                    {'id': 'sys_admin', 'name': '系统管理员', "enabled": true},
                    {'id': 'developer', 'name': '开发者', "enabled": true},
                    {'id': 'vendor_admin', 'name': '厂商管理员', "enabled": false}
                ];
                let changeArr = this.changeJson;
                if (changeArr.length) {
                    for (var i = 0; i < changeArr.length; i++) {
                        console.log(changeArr[i].id);
                        for (var j = 0; j < this.role_list.length; j++) {
                            if (this.role_list[j].id == changeArr[i].id) {
                                this.role_list[j].enabled = changeArr[i].enabled
                            }
                        }
                    }
                }
                this.error = error
            }
        );

    }

    //分配应⽤默认的⻆⾊
    setMachineRoleFuncs(): void {
        let machine_id = this.machine_id;
        this.service.setMachineRoleFuncs(machine_id, this.changeJson).subscribe(
            result => {
                if (result.code == 10000) {

                    this.globelMsg = "保存成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();

                } else {
                    this.globelMsg = Defined.ByCodeMsg(result);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error;

            }
        );

    }

    //获取服务器的主从关系
    getMachieMaster(machine_id: number): void {

        this.service.getMachieMaster(machine_id).subscribe(
            result => {
                if (result.code == 10000) {
                    if (!result.is_master) {
                        this.master_id = result.master_id;
                        this.svr_access_token = result.svr_access_token;

                    }
                    for (var i = 0; i < this.machine_list.length; i++) {
                        if (this.machine_list[i].id != this.machine_id) {
                            this.select_machine_list.push(this.machine_list[i]);
                        }
                    }
                    if (!this.master_id) {
                        this.master_id = this.select_machine_list[0].id;
                    }
                    this.changeMaster(result.is_master);
                    this.is_master = result.is_master;
                }
            },
            error => {
                this.error = error;
                let master = {'is_master': false, 'master_id': 2, 'access_token': 'test123456'};
                // let master = {'is_master': true};
                master = JSON.parse(JSON.stringify(master));
                if (!master.is_master) {
                    this.master_id = master.master_id;
                    this.svr_access_token = "test12345";
                }
                for (var i = 0; i < this.machine_list.length; i++) {
                    if (this.machine_list[i].id != this.machine_id) {
                        this.select_machine_list.push(this.machine_list[i]);
                    }
                }
                if (!this.master_id) {
                    this.master_id = this.select_machine_list[0].id;
                }
                this.changeMaster(master.is_master);
                this.is_master = master.is_master;

            }
        );
    }

    //设置服务器的主从关系
    setMachineMaster(machine_id: number): void {
        let is_master = this.changeDisabled;
        let master_id = this.master_id;
        let svr_access_token = this.svr_access_token;
        this.service.setMachineMaster(machine_id, is_master, master_id, svr_access_token).subscribe(
            result => {
                if (result.code == 10000) {

                    this.globelMsg = "保存成功！";

                    //500毫秒隐藏modal
                    this.setTimeOut();

                    this.resetMachineInfo();

                } else {
                    this.globelMsg = Defined.ByCodeMsg(result);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error;
            }
        );
    }

    //隐藏modal
    closeModal(target): void {
        target.hide();
        this.resetMachineInfo();
        this.select_machine_list = [];
    }

    getModalTarget(target): void {
        target.show();
        this.modalTarget = target;
    }

    //重置form表单
    resetMachineInfo(): void {
        this.role_list = [];
        this.changeJson.splice(0, this.changeJson.length);
        this.temp_roles.splice(0, this.temp_roles.length);
        this.machine_info.reset();
        this.select_machine_list = [];
    }

    changeFuncs(fun_id, flag): void {
        console.log(fun_id, flag);
        let json = {'id': fun_id, 'enabled': flag};
        this.temp_roles.push(json);
        let roles = this.temp_roles;
        if (this.temp_roles) {
            for (let entry of roles) {
                if (entry["id"] == fun_id) {
                    entry["enabled"] = flag;
                }
            }
        }
        let funcsArr = this.temp_roles;
        let arrM = [];
        let tempMap = {};
        for (var i = 0; i < funcsArr.length; i++) {
            var obj = funcsArr[i];
            var key = obj["id"];
            if (tempMap[key] != 0 && !tempMap[key]) {
                tempMap[key] = obj["enabled"];

                arrM.push({id: obj["id"], enabled: tempMap[key]});
            }
        }

        this.changeJson = arrM;
    }

    changeMaster(flag: boolean): void {
        console.log(flag);
        if (flag) {
            this.changeDisabled = flag;
        } else {
            this.changeDisabled = flag;
        }
    }

    changeServer(id: any): void {
        this.master_id = parseInt(id);
        let master_id = this.master_id;
        let machine_id = this.machine_id;
        if (master_id == parseInt(machine_id)) {
            this.changeMaster(true);
            this.is_master = true;
        }
    }


}
