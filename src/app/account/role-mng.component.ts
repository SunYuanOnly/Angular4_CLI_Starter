/**
 * Created by cg on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';
import {RoleMngService} from './role-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
  templateUrl: 'role-mng.component.html',
  styles: [`.red{color:red;}`]
})
export class RoleMngComponent implements OnInit {

  public error: any;
  public role_list: any;
  role_info: FormGroup;

  constructor(public service: RoleMngService, public fbld: FormBuilder) {
    this.role_info = fbld.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  public globelMsg: any;
  public msgShow: boolean;
  public modalTarget: any;
  public module_tree: any;
  public domain_tree: any;
  public domain_id = "";
  public role_id: any;
  public funcs_list: any;
  public funcs = [];
  public changeJson = [];
  public page_no: number = 1;
  public count: number = 5;
  public total: number;
  public addAllow = true;

  //初始化
  ngOnInit(): void {
    this.getRoleList("");
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
            "name": "运营商A",
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

  //获取role列表
  getRoleList(domain_id: any): void {
    this.domain_id = domain_id;
    this.addAllow = false;
    this.service.getRoleList(domain_id).subscribe(
      role_list => {
        if (role_list.code == Defined.OK) {
          this.role_list = role_list.roles;
          // this.page_no = role_list.page_no;
          this.total = role_list.total;
        }
        console.log(this.role_list);
      },
      error => {
        this.error = error;
        this.role_list = [
          {'id': 'sys_admin', 'name': '系统管理员'},
          {'id': 'developer', 'name': '开发者'},
          {'id': 'vendor_admin', 'name': '厂商管理员'},
          {'id': 'sys_admin', 'name': '系统管理员'},
          {'id': 'developer', 'name': '开发者'}
        ]
      }
    );
  }

  //获取module树
  getModuleTree(): void {
    this.service.getModuleTree().subscribe(
      module_tree => {
        this.module_tree = module_tree.modules;
      },
      error => {
        let modules = [
          {
            "id": 1,
            "tag": "system",
            "name": "系统参数",
            "ui_show": true,
            "children": [
              {
                "id": 2,
                "tag": "module",
                "name": "系统模块管理",
                "ui_show": true,
                "children": []
              },
              {
                "id": 3,
                "tag": "function",
                "name": "功能项管理",
                "ui_show": true,
                "children": []
              },
              {
                "id": 4,
                "tag": "domain",
                "name": "域管理",
                "ui_show": true,
                "children": []
              }
            ]
          },
          {
            "id": 5,
            "tag": "account",
            "name": "账号及权限",
            "ui_show": true,
            "children": []
          },
          {
            "id": 7,
            "tag": "ui",
            "name": "界面接口",
            "ui_show": true,
            "children": [
              {
                "id": 27,
                "tag": "admin",
                "name": "管理页面",
                "ui_show": true,
                "children": []
              }
            ]
          }
        ];
        this.module_tree = modules;


        this.error = error
      }
    );
  }

  //添加角色信息
  addRole(): void {
    let data = this.role_info.controls;
    let domain_id = this.domain_id;
    this.service.addRole(data, domain_id).subscribe(
      result => {

        if (result.code == Defined.OK) {

          this.globelMsg = "添加成功！";

          this.resetRoleInfo();

          //500毫秒隐藏modal
          this.setTimeOut();
          this.getRoleList("");

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

  //修改角色信息
  editRole(): void {
    let data = this.role_info.controls;

    this.service.editRole(data).subscribe(
      result => {
        if (result.code == Defined.OK) {

          this.globelMsg = "修改成功！";
          //500毫秒隐藏modal
          this.setTimeOut();
          this.resetRoleInfo();
          this.getRoleList("");

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

  //获取方法列表
  getMethodItem(list: any): void {

    let module_id = list.id;
    this.service.getMethodItem(module_id, this.role_id).subscribe(
      funcs_list => {
        if (funcs_list.code == Defined.OK) {
          this.funcs_list = funcs_list.funcs;
          let changeArr = this.changeJson;
          if (changeArr.length) {
            for (var i = 0; i < changeArr.length; i++) {
              console.log(changeArr[i].id);
              for (var j = 0; j < this.funcs_list.length; j++) {
                if (this.funcs_list[j].id == changeArr[i].id) {
                  this.funcs_list[j].enabled = changeArr[i].enabled
                }
              }
            }
          }
        }

      },
      error => {
        this.error = error;
        this.funcs_list = [
          {"id": "get_list", "name": '取列表', "api:": 'test', "enabled": true},
          {"id": "add", "name": '添加', "api:": 'test', "enabled": false},
          {"id": "edit", "name": '修改', "api:": 'test', "enabled": true},
          {"id": "del", "name": '删除', "api:": 'test', "enabled": false}
        ]
        let changeArr = this.changeJson;
        if (changeArr.length) {
          for (var i = 0; i < changeArr.length; i++) {
            console.log(changeArr[i].id);
            for (var j = 0; j < this.funcs_list.length; j++) {
              if (this.funcs_list[j].id == changeArr[i].id) {
                this.funcs_list[j].enabled = changeArr[i].enabled
              }
            }
          }
        }
      }
    );
  }

  //删除厂家
  removeRole(id: string): void {
    this.service.removeRole(id).subscribe(
      result => {
        if (result.code == Defined.OK) {
          this.globelMsg = "删除成功！";
          //500毫秒隐藏modal
          this.setTimeOut();
          this.resetRoleInfo();
          this.getRoleList("");
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

  openModal(target, data, type): void {

    if (data != "") {
      this.role_info = this.fbld.group({
        id: [data.id, Validators.required],
        name: [data.name, Validators.required]
      });
      this.role_id = data.id;
    }

    if (type != "") {
      this.getModuleTree();
      this.funcs_list = [];
    }
    this.modalTarget = target;

    target.show();

  }

  closeModal(target): void {
    target.hide();
    this.resetRoleInfo();
    this.funcs_list = [];

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

  changeFuncs(fun_id, flag): void {
    console.log(fun_id, flag);
    let json = {'id': fun_id, 'enabled': flag};
    this.funcs.push(json);
    let funcs = this.funcs;
    if (this.funcs) {
      for (let entry of funcs) {
        if (entry["id"] == fun_id) {
          entry["enabled"] = flag;
        }
      }
    }
    let funcsArr = this.funcs;
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

  resetRoleInfo(): void {
    this.role_info.reset();
    this.changeJson.splice(0, this.changeJson.length);
    this.funcs.splice(0, this.funcs.length);
  }

  //设置角色权限
  setRoleFuncs(): void {
    this.service.setRoleFuncs(this.role_id, this.changeJson).subscribe(
      result => {
        if (result.code == Defined.OK) {

          this.globelMsg = "保存成功！";
          //500毫秒隐藏modal
          this.setTimeOut();
          this.getRoleList("");

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
}
