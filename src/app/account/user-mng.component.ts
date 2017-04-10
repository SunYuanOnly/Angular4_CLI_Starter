/**
 * Created by cg on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';
import {UserMngService} from "./user-mng.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
    templateUrl: 'user-mng.component.html',
    styles: [`
     .bbs_title .bbs_nav2 > ul > li {
        float: left;
        color: #999999;
        font-size: 14px;
        list-style:none;
        border: 1px solid #e5e5e5;
        min-width: 143px;
        width: auto;
        height: 37px;
        line-height: 37px;
        position: relative;
        margin-right: 10px;
        text-indent: 13px;
    }
    .js_add_proSort {
        border-bottom: 2px solid #fff !important;
        padding-bottom: 10px;
    }
    .js_hover_proSort {
        z-index: 2;
        position: relative;
        border: 1px solid #e5e5e5;
        background-color: #fff;
    }
    .show_domain{
        display: block;
    }
    .hide_domain{
        display: none;
    }
    .red,.error{
        color:red;
    }
     .bbs_title .bbs_nav2 {
        position: relative;
        float: left;
    }
     .bbs_title .bbs_productSort ul {
        border: 1px solid #e5e5e5;
        width: 300px;
        height: 300px;
        background-color: #fff;
        z-index: 2;
        position: absolute;
        top: 49px;
        left: 0;
        padding: 20px 0;
}`]
})
export class UserMngComponent implements OnInit {

    public error: any;
    public user_info: FormGroup;
    public user_list: any;
    public user_id = "";
    public modalTarget: any;
    public globelMsg: any;
    public msgShow: boolean;
    public domain_tree: any;
    public addAllow = true;
    public role_list: any;
    public temp_roles = [];
    public roles = [];
    public changeJson = [];
    public page_no: number = 1;
    public count: number = 5;
    public total: number;
    public serarch_id = "";
    public show_domain: string = "hide_domain";
    public domain_border = "";
    public flag = true;
    public domain_id = "";
    public domain_name = "请选择域";

    constructor(public service: UserMngService, public fbld: FormBuilder) {
        this.user_info = fbld.group({
            id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            pwd: ['', [Validators.required]],
            rpwd: ['', Validators.compose([
                Validators.required])],
            mobile: ['', [Validators.pattern("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$")]],
            email: ['', [Validators.pattern("[\\w]+?@[\\w]+?\\.[a-z]+?")]],
            reg_time: ['', [Validators.required]],
            act_time: ['', [Validators.required]],
            status: [1, [Validators.required]]
        });
    }

    //初始化
    ngOnInit(): void {
        //this.getRoleList();
        this.getUserList(this.domain_id,this.user_id, this.count, 1);
        this.getDomainTree();
    }

    //获取user列表
    getUserList(domain_id:any, user_id: string, count: number, page_no: number): void {
        this.service.getUserList(domain_id,user_id, count, page_no).subscribe(
            user_list => {
                if (user_list.code == Defined.OK) {
                    this.user_list = user_list.users;
                    // this.page_no = user_list.page_no;
                    this.total = user_list.total;
                }
            },
            error => {
                let users = [
                    {
                        "id": "admin1",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    },
                    {
                        "id": "admin2",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 0
                    },
                    {
                        "id": "admin3",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    },
                    {
                        "id": "admin4",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    }, {
                        "id": "admin5",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    }, {
                        "id": "admin6",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    }, {
                        "id": "admin6",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    }, {
                        "id": "admin6",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    }, {
                        "id": "admin6",
                        "name": "管理员",
                        "mobile": "13217000875",
                        "email": "985969214@qq.com",
                        "reg_time": "2017-01-02 12:00:00",
                        "act_time": "2017-01-30 12:00:00",
                        "status": 1
                    }
                ];
                this.user_list = users;
                this.error = error
            }
        );

    }


    //添加用户
    addUser(): void {
        let data = this.user_info.controls;
        console.log(this.domain_id);
        if (this.roles.length <= 0) {
            this.globelMsg = "分配的角色不能为空！";
            //显示提示消息
            this.msgShow = true;
        } else {
            this.service.addUser(data, this.roles,this.domain_id).subscribe(
                result => {

                    if (result.code == 10000) {

                        this.globelMsg = "添加成功！";
                        //500毫秒隐藏modal
                        this.setTimeOut();
                        this.resetUserInfo();
                        this.getUserList("","" ,this.count, 1);

                    } else {
                        this.globelMsg = Defined.ByCodeMsg(result);
                    }

                    //显示提示消息
                    this.msgShow = true;
                },
                error => {
                    this.error = error;

                    this.modalTarget.hide();
                }
            );
        }

    }

    //修改用户
    editUser(): void {
        let data = this.user_info.controls;
        // data['status'].value = this.curr_app_status;
        this.service.editUser(data).subscribe(
            result => {

                if (result.code == 10000) {

                    this.globelMsg = "修改成功！";

                    this.resetUserInfo();

                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getUserList("","" ,this.count, 1);

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

    //删除用户
    removeUser(user_id: string): void {
        this.service.removeUser(user_id).subscribe(
            result => {
                if (result.code == 10000) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getUserList("","" ,this.count, 1);
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

    //查询用户
    searchUsers(id: string): void {
        //console.log(id);
        console.log(id);
        this.getUserList(this.domain_id,id, this.count, 1);

    }

    //重置密码
    resetPassword(user_id: string): void {
        let pwd = this.user_info.controls['pwd'].value;
        let rpwd = this.user_info.controls['rpwd'].value;
        if (pwd == rpwd) {
            this.service.resetPassword(user_id, pwd).subscribe(
                result => {
                    if (result.code == 10000) {
                        this.globelMsg = "修改成功！";
                        //500毫秒隐藏modal
                        this.setTimeOut();
                        this.getUserList("","", this.count, 1);
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
        } else {
            this.globelMsg = "两次密码输入不一致！";
            //显示提示消息
            this.msgShow = true;
        }


    }


    //获取domain树
    getDomainTree(): void {
        this.service.getDomainTree().subscribe(
            domain_tree => {
                this.domain_tree = domain_tree.domains;
            },
            error => {
                let domains = [
                    {
                        "id": 1,
                        "tag": "运营商A运营商A运营商A运营商A运营商A运营商A运营商A",
                        "name": "运营商A运营商A运营商",
                        "desc": "texttexttexttexttexttexttexttext1",
                        "children": [
                            {
                                "id": 2,
                                "tag": "浙江",
                                "name": "浙江",
                                "desc": "texttexttexttexttexttexttexttext2",
                                "children": []
                            },
                            {
                                "id": 3,
                                "tag": "江苏",
                                "name": "江苏",
                                "desc": "texttexttexttexttexttexttexttext3",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "tag": "企业用户A",
                        "name": "企业用户A",
                        "desc": "texttexttexttexttexttexttexttext4",
                        "children": [
                            {
                                "id": 27,
                                "tag": "部门1",
                                "name": "部门1",
                                "desc": "texttexttexttexttexttexttexttext5",
                                "children": []
                            },
                            {
                                "id": 28,
                                "tag": "部门2",
                                "name": "部门2",
                                "desc": "texttexttexttexttexttexttexttext6",
                                "children": []
                            }
                        ]
                    }
                ];
                this.domain_tree = domains;
                this.error = error
            }
        );
    }

    //获取⽤户对应的角色
    getRoleListByUserId(id: any): void {
        let user_id = id;
        this.service.getRoleListByUserId(user_id).subscribe(
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
    setUserRoleFuncs(): void {
        let user_id = this.user_info.controls['id'].value;
        this.service.setUserRoleFuncs(user_id, this.changeJson).subscribe(
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

    openModal(target, data, type): void {
        console.log(data);
        if (data) {
            this.user_info = this.fbld.group({
                id: [data.id, Validators.required],
                name: [data.name, Validators.required],
                pwd: [data.pwd, Validators.required],
                rpwd: ['', Validators.required],
                mobile: [data.mobile, Validators.required],
                email: [data.email, Validators.required],
                reg_time: [data.reg_time, Validators.required],
                act_time: [data.act_time, Validators.required],
                status: [data.status, Validators.required]
            });
            this.user_id = data.id;
        }

        if (type) {
            this.getRoleListByUserId(this.user_id);
        }

        this.modalTarget = target;

        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.resetUserInfo();
    }

    resetUserInfo(): void {

        this.user_info.reset();
        this.role_list = [];
        this.changeJson.splice(0, this.changeJson.length);
        this.temp_roles.splice(0, this.temp_roles.length);
    }

    setTimeOut(): void {

        let me = this;
        //500毫秒隐藏modal
        setTimeout(function () {
            me.modalTarget.hide();
            me.globelMsg = "";
            me.msgShow = false;
        }, 500);
    }

    getModalTarget(target): void {
        target.show();
        this.modalTarget = target;
    }

    setUserRole(target): void {
        target.show();
        // this.modalTarget = target;
        this.getRoleListByUserId('');

    }

    setRoleId(target): void {
        let roles = [];
        for (let i = 0; i < this.changeJson.length; i++) {
            if (this.changeJson[i].enabled == true) {
                roles.push({id: this.changeJson[i].id})
            }
        }
        this.roles = roles;
        target.hide();
    }

    showDomain(): void {
        if (this.flag) {
            this.show_domain = "show_domain";
            this.domain_border = "js_add_proSort";
            this.flag = !this.flag;
        } else {
            this.show_domain = "hide_domain";
            this.domain_border = "";
            this.flag = !this.flag;
        }

    }

    getDomainInfo(domain_id, domain_name) {
        this.page_no = 1;
        this.getUserList(domain_id,"", this.count, 1);
        this.domain_name = domain_name;
        this.domain_id = domain_id;
        this.addAllow = false;
        this.showDomain();
    }
}
