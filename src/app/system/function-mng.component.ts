/**
 * Created by cg on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';
import {FunMngService} from './function-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

import {TreeNode} from 'angular2-tree-component/dist/models/tree-node.model';
import {Defined} from '../defined';
import {Lang} from '../lang';

@Component({
  selector: 'function-mng',
  templateUrl: 'function-mng.component.html',
})

export class FunctionMngComponent implements OnInit {

  modules_info: FormGroup;
  node: TreeNode;
  funcs_info: FormGroup;
  public default_lang = Lang.default_lang;
  public lang = Lang.langs;
  public nodeTarget: any = "";
  //default_lang: Observable<any>;

  constructor(public route: ActivatedRoute, public service: FunMngService, public fbld: FormBuilder) {

    this.modules_info = fbld.group({
      pid: [0, Validators.required],
      tag: ['', Validators.required],
      name: ['', Validators.required],
      ui_show: [false, Validators.required]
    });

    this.funcs_info = fbld.group({
      id: [0, Validators.required],
      tag: ['', Validators.required],
      name: ['', Validators.required],
      check_auth: [false, Validators.required],
      rw: [3, Validators.required],
    });

  }

  public module_tree: any;
  public error: any;
  public funList: any;
  public globelTitle = "主目录";
  public nodeList: TreeNode;
  public globelMsg: any;
  public msgShow: boolean;
  public modalTarget: any;
  public module_id = 0;
  public searchText = "";


  openModal(target, data): void {

    if (data != "") {

      this.funcs_info = this.fbld.group({
        id: [data.id, Validators.required],
        tag: [data.tag, Validators.required],
        name: [data.name, Validators.required],
        check_auth: [data.check_auth, Validators.required],
        rw: [data.rw, Validators.required]
      });

    }

    // console.log(this.nodeList.data.pid)
    if (this.nodeList) {
      this.modules_info = this.fbld.group({
        pid: [this.nodeList.data.pid, Validators.required],
        tag: [this.nodeList.data.tag, Validators.required],
        name: [this.nodeList.data.name, Validators.required],
        ui_show: [this.nodeList.data.ui_show, Validators.required]
      });
    }


    this.modalTarget = target;
    target.show();

  }

  closeModal(target): void {
    target.hide();

    this.funcs_info.reset();
  }

  //初始化
  ngOnInit(): void {

    this.getModuleTree();
    this.route.params.subscribe((params: Params) => {
      this.default_lang = params["lang"];
    });

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

  //获取功能项数据
  getFunItem(node: any, e): void {
    this.nodeList = node;
    this.nodeTarget = e.target;
    // console.log(e.target)
    this.module_id = node.data.id; //根据module_id查询功能项
    this.globelTitle = node.data.name;
    this.service.getFunItem(this.module_id).subscribe(
      funList => {
        this.funList = funList.functions;
      },
      error => {
        let funListData = [
          {'id': 'add1', 'tag': 'add1', 'module_id': 2, 'name': '添加1', 'rw': 0, 'check_auth': false},
          {'id': 'add2', 'tag': 'add2', 'module_id': 2, 'name': '添加1', 'rw': 1, 'check_auth': true},
          {'id': 'add3', 'tag': 'add3', 'module_id': 2, 'name': '添加1', 'rw': 2, 'check_auth': true},
          {'id': 'add4', 'tag': 'add4', 'module_id': 2, 'name': '添加1', 'rw': 3, 'check_auth': true}
        ];
        this.funList = funListData;
        this.error = error
      }
    );
  }

  //添加module
  addModule(): void {
    let addData = this.modules_info.controls;
    this.service.addModule(addData, this.module_id).subscribe(
      result => {
        if (result.code == Defined.OK) {
          this.globelMsg = "添加成功！";
          //初始化form,清空input
          this.modules_info.reset();
          //500毫秒隐藏
          this.setTimeOut();
          //添加成功,刷新module树;
          this.getModuleTree();
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

  //修改module
  editModule(): void {
    let module_id = this.module_id;
    console.log(this.modules_info);
    this.service.editModule(this.modules_info, module_id).subscribe(
      result => {
        if (result.code == Defined.OK) {
          this.globelMsg = "修改成功";
          this.nodeList.data.name = this.modules_info.controls['name'].value;
          this.nodeList.data.ui_show = this.modules_info.controls['ui_show'].value;
          //500毫秒隐藏modal
          this.setTimeOut();
          //刷新ModuleTree;
          //this.getModuleTree();

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

  //查询module
  searchFun(tree): void {
    let searchText = this.searchText;
    if (searchText != "") {

      tree.treeModel.filterNodes(searchText);

    } else {

      tree.treeModel.clearFilter();
    }
  }

  //删除module
  delModule(): void {
    let module_id = this.module_id;
    this.service.delModule(module_id).subscribe(
      result => {
        //this.funList=funList;
        if (result.code == Defined.OK) {
          this.globelMsg = "删除成功！";
          //500毫秒隐藏modal
          this.setTimeOut();
          this.modules_info.reset();
          //刷新ModuleTree
          this.getModuleTree();
        } else {
          this.globelMsg = Defined.ByCodeMsg(result);
        }

        //显示提示消息
        this.msgShow = true;
      },
      error => {
        // console.log(this.processNodes(data));
        this.error = error
      }
    );
  }

  //添加功能项
  addFunItem(): void {
    let funFormData = this.funcs_info.controls;
    this.service.addFunItem(funFormData, this.module_id).subscribe(
      result => {

        if (result.code == Defined.OK) {

          this.globelMsg = "添加成功！";

          this.funcs_info.reset();

          //500毫秒隐藏modal
          this.setTimeOut();

          //添加成功getFunItem;
          this.getFunItem(this.nodeList, "");

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

  //修改功能项
  editFunItem(): void {

    //this.globelEdit.value.name
    this.service.editFunItem(this.funcs_info).subscribe(
      result => {
        if (result.code == Defined.OK) {

          this.globelMsg = "修改成功！";

          //500毫秒隐藏modal
          this.setTimeOut();

          this.funcs_info.reset();
          //添加成功getFunItem;

          this.getFunItem(this.nodeList, "");

        } else {
          this.globelMsg = Defined.ByCodeMsg(result);
        }

        //显示提示消息
        this.msgShow = true;
      },
      error => {

        // console.log(this.processNodes(data));
        this.error = error
      }
    );

  }

  //删除功能项
  delFunItem(): void {
    let id = this.funcs_info.controls['id'].value;

    this.service.delFunItem(id).subscribe(
      result => {
        if (result.code == Defined.OK) {

          this.globelMsg = "删除成功！";
          //500毫秒隐藏modal
          this.setTimeOut();
          this.funcs_info.reset();
          //添加成功getFunItem;
          this.getFunItem(this.nodeList, "");

        } else {
          this.globelMsg = Defined.ByCodeMsg(result);
        }

        //显示提示消息
        this.msgShow = true;

      },
      error => {
        // console.log(this.processNodes(data));

        this.error = error
      }
    );
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
    //console.log(this.modules_info.controls);
    this.modules_info = this.fbld.group({
      pid: [0, Validators.required],
      tag: ['', Validators.required],
      name: ['', Validators.required],
      ui_show: [false, Validators.required]
    });
    this.funcs_info = this.fbld.group({
      id: [0, Validators.required],
      tag: ['', Validators.required],
      name: ['', Validators.required],
      check_auth: [false, Validators.required],
      rw: [3, Validators.required],
    });
    target.show();
    this.modalTarget = target;
  }

  lostFoucs(e): void {
    e = e || window.event;
    let target = e.target || e.srcElement;
    console.log(target);
    console.log(this.nodeTarget);
    if ((target != this.nodeTarget) && (this.nodeList)) {
      //this.nodeList.isActive="";
      this.nodeList.setIsActive(false);
      this.nodeList = null;
      this.globelTitle = "主目录";
      this.modules_info = this.fbld.group({
        pid: [0, Validators.required],
        tag: ['', Validators.required],
        name: ['', Validators.required],
        ui_show: [false, Validators.required]
      });
      //this.nodeList.setActiveAndVisible(false);
    }
  }

}


