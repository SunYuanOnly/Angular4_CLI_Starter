/**
 * Created by cg on 2017/2/4.
 */
import {Component, OnInit} from '@angular/core';
import {ApplicationMngService} from './application-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import any = jasmine.any;
import {Defined} from '../defined';
@Component({
    templateUrl: 'application-mng.component.html',
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
     }
     .head {
        width: 98%;
        height: 45px;
        padding-left:10px;
        cursor: pointer;
        white-space: nowrap;
        line-height: 38px;
        border-bottom: 1px solid #ccc;
        overflow-x: auto;
        
     }
     .type_active{
            color: #fff;
            background-color: #337ab7
     }
`]

})
export class ApplicationMngComponent implements OnInit {
    public error: any;

    public application_list: any;

    application_info: FormGroup;
    template_info: FormGroup;

    public globelMsg: any;
    public msgShow: boolean;
    public modalTarget: any;
    public addAllow = true;
    public allowTempAdd = true;

    public domain_tree: any;
    public role_list: any;
    public roles = [];
    public changeJson = [];
    public show_domain: string = "hide_domain";
    public domain_border = "";
    public flag = true;
    public domain_id = "";
    public domain_name = "请选择域";
    public page_no: number = 1;
    public count: number = 3;
    public total: number;
    public template_type_list: any;
    public templates_list: any;
    public template_type_id = "";
    public app_id: number;
    public currentIndex: any;
    public isJson: boolean = false;

    constructor(public service: ApplicationMngService, public fbld: FormBuilder) {

        this.application_info = this.fbld.group({
            id: [0, Validators.required],
            name: ["", Validators.required],
            app_key: ["", Validators.required],
            app_pass: ["", Validators.required],
            status: [1, Validators.required],
        });

        this.template_info = this.fbld.group({
            lang_id: ["zh_cn", Validators.required],
            content: ["", Validators.required],
        });

    }

    //初始化
    ngOnInit(): void {
        this.getApplicationList('', this.count, 1);
        this.getDomainTree();
    }


    public getApplicationList(domain_id: string, count: number, page_no: number) {

        console.log(domain_id);
        this.service.getApplicationList(domain_id, count, page_no).subscribe(
            application_list => {
                if (application_list.code == Defined.OK) {
                    this.application_list = application_list.applications;
                    // this.page_no = application_list.page_no;
                    this.total = application_list.total;
                }
            },
            error => {
                this.application_list = [
                    {
                        "id": 1,
                        "name": "应用1",
                        "app_key": "C7670FA0-5430-0001-768D-FEF0843D199F",
                        "app_pass": '4bc2ef6bac7208206e623e65c91e9eaf',
                        "status": 1
                    },
                    {"id": 2, "name": "应用2", "app_key": "test2", "app_pass": 'test1', "status": 0},
                    {"id": 3, "name": "应用3", "app_key": "test3", "app_pass": 'test1', "status": 2},
                    {"id": 4, "name": "应用3", "app_key": "test3", "app_pass": 'test1', "status": 2},
                    {"id": 5, "name": "应用3", "app_key": "test3", "app_pass": 'test1', "status": 2}
                ];
                // this.page_no=2;
                // this.count=1;
                // this.page_count=5;
                this.error = error
            }
        );
    }

    //添加应用
    addApplication(): void {
        let data = this.application_info.controls;

        this.service.addApplication(this.domain_id, data).subscribe(
            result => {

                if (result.code == Defined.OK) {

                    this.globelMsg = "添加成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();

                    this.resetApplicationInfo();

                    this.getApplicationList(this.domain_id, this.count, 1);

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


    //修改应用
    editApplication(): void {
        let data = this.application_info.controls;

        this.service.editApplication(data).subscribe(
            result => {
                if (result.code == Defined.OK) {

                    this.globelMsg = "修改成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.resetApplicationInfo();
                    this.getApplicationList(this.domain_id, this.count, 1);

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

    //删除应用
    removeApplication(id: string): void {
        this.service.removeApplication(id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.resetApplicationInfo()
                    this.getApplicationList(this.domain_id, this.count, 1);
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

    //重置应用
    resetApplication(id: string) {
        this.service.resetApplication(id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "重置成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();

                    this.resetApplicationInfo();
                    this.getApplicationList(this.domain_id, this.count, 1);
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
                        "tag": "运营商A",
                        "name": "运营商A运营商A运营商A运营商A",
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
                    },

                ];
                this.domain_tree = domains;
                this.error = error
            }
        );
    }


    //获取默认角色
    getRoleList(id: any): void {
        let app_id = this.application_info.controls['id'].value;

        this.service.getRoleList(app_id, id).subscribe(
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
    setAppRoleFuncs(): void {
        let app_id = this.application_info.controls['id'].value;

        this.service.setAppRoleFuncs(app_id, this.changeJson).subscribe(
            result => {
                if (result.code == Defined.OK) {

                    this.globelMsg = "保存成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.role_list = [];
                    this.getApplicationList(this.domain_id, this.count, 1);

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
        let json = {'id': fun_id, 'enabled': flag};
        this.roles.push(json);
        let roles = this.roles;
        if (this.roles) {
            for (let entry of roles) {
                if (entry["id"] == fun_id) {
                    entry["enabled"] = flag;
                }
            }
        }
        let funcsArr = this.roles;
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

        if (data) {
            this.application_info = this.fbld.group({
                id: [data.id, Validators.required],
                name: [data.name, Validators.required],
                app_key: [data.app_key, Validators.required],
                app_pass: [data.app_pass, Validators.required],
                status: [data.status, Validators.required],
            });
        }

        if (type) {
            this.getDomainTree();
            this.getRoleList(this.domain_id);
        }

        this.modalTarget = target;

        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.resetApplicationInfo();
        this.currentIndex = "";
        this.template_type_id = "";
        this.role_list = [];
    }

    closeTempModal(target): void {
        target.hide();
        this.globelMsg = "";
        this.template_info.reset();
    }

    resetApplicationInfo(): void {
        this.application_info.reset();
        this.changeJson.splice(0, this.changeJson.length);
        this.roles.splice(0, this.roles.length);
        this.templates_list = [];
        this.template_type_list = [];
        this.allowTempAdd = true;
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
        this.getApplicationList(domain_id, this.count, this.page_no);
        this.domain_name = domain_name;
        this.domain_id = domain_id;
        this.addAllow = false;
        this.showDomain();
    }

    getModalTarget(target): void {
        target.show();
        this.modalTarget = target;
    }


    setTemplate(target, data): void {

        this.application_info = this.fbld.group({
            id: [data.id, Validators.required],
            name: [data.name, Validators.required],
            app_key: [data.app_key, Validators.required],
            app_pass: [data.app_pass, Validators.required],
            status: [data.status, Validators.required],
        });
        this.app_id = data.id;
        this.getTemplateTypeList();
        this.modalTarget = target;

        target.show();

    }

    //获取模版类型列表
    getTemplateTypeList(): void {
        this.service.getTemplateTypeList().subscribe(
            template_type_list => {
                if (template_type_list.code == Defined.OK) {
                    this.template_type_list = template_type_list.types;

                }
            },
            error => {
                this.error = error;
                this.template_type_list = [
                    {'id': 'mobile_code', 'name': '短信验证码'},
                    {'id': 'email_code', 'name': '邮箱验证码'},
                    {'id': 'email_code', 'name': '邮箱找回密码'},
                    {'id': 'mobile_code', 'name': '短信验证码'},
                    {'id': 'email_code', 'name': '邮箱验证码'},
                    {'id': 'email_code', 'name': '邮箱找回密码'}
                ]
            }
        );
    }

    //获取模版列表
    getTemplateList(index, template_type_id: string): void {
        this.allowTempAdd = false;
        this.currentIndex = index;
        this.template_type_id = template_type_id;
        this.service.getTemplateList(template_type_id, this.app_id).subscribe(
            templates_list => {
                if (templates_list.code == Defined.OK) {
                    this.templates_list = templates_list.templates;

                }
            },
            error => {
                this.error = error;
                this.templates_list = [
                    {'lang_id': 'zh_cn', 'content': '验证码短信验证码短信验证码短信验证码短信验证码短信验证码'},
                    {'lang_id': 'en', 'content': '短信验证码短信验证码短信验证码短信验证码短信验证码短信验证码短信验证码短信验证码'}


                ]
            }
        );

    }

    openTempModal(target, data): void {

        this.template_info = this.fbld.group({
            lang_id: [data.lang_id, Validators.required],
            content: [data.content, Validators.required],
        });

        this.modalTarget = target;

        target.show();

    }

    //添加模版
    addTemplate(): void {
        let data = this.template_info.controls;
        let content = this.template_info.controls['content'].value;

        this.isJSON(content);
        if (this.isJson) {
            this.service.addTemplate(this.app_id, this.template_type_id, data).subscribe(
                result => {

                    if (result.code == Defined.OK) {

                        this.globelMsg = "添加成功！";
                        //500毫秒隐藏modal
                        this.setTimeOut();

                        this.template_info.reset();

                        this.getTemplateList(this.currentIndex, this.template_type_id)

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
        } else {
            this.globelMsg = "模版格式不正确，必须是json格式！";
            this.msgShow = true;
        }
    }

    //修改模版信息
    editTemplate(): void {
        let data = this.template_info.controls;
        let content = this.template_info.controls['content'].value;

        this.isJSON(content);
        if (this.isJson) {
            this.service.editTemplate(this.app_id, this.template_type_id, data).subscribe(
                result => {

                    if (result.code == Defined.OK) {

                        this.globelMsg = "修改成功！";
                        //500毫秒隐藏modal
                        this.setTimeOut();

                        this.template_info.reset();

                        this.getTemplateList(this.currentIndex, this.template_type_id)

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

        } else {
            this.globelMsg = "模版格式不正确，必须是json格式！";
            this.msgShow = true;
        }

    }

    //删除模版
    removeTemplate(id: string): void {
        this.service.removeTemplate(this.app_id, this.template_type_id, id).subscribe(
            result => {

                if (result.code == Defined.OK) {

                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();

                    this.template_info.reset();

                    this.getTemplateList(this.currentIndex, this.template_type_id)

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

    //判断是否为json格式
    isJSON(str): void {
        try {
            // eval('('+str+')');
            JSON.parse(str);
            this.isJson = true;

        }
        catch (er) {
            this.isJson = false;
        }
    }
}
