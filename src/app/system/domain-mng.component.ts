/**
 * Created by cg on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomainMngService} from './domain-mng.service';
import {Defined} from '../defined';
import {ActivatedRoute, Params} from '@angular/router';

import {Lang} from '../lang';

@Component({
    templateUrl: 'domain-mng.component.html',
    styles: [`.red{color:red;}`]
})
export class DomainMngComponent implements OnInit {
    domains_info: FormGroup;

    constructor(public route: ActivatedRoute,public service: DomainMngService, public fbld: FormBuilder) {

        this.domains_info = fbld.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            desc: ['', Validators.required]
        });

        // this.globelAddDomain = fbld.group({
        //     id: ['', Validators.required],
        //     name: ['', Validators.required],
        //     desc: ['', Validators.required]
        // });
        // this.globelEditDomain = fbld.group({
        //     id: ['', Validators.required],
        //     name: ['', Validators.required],
        //     desc: ['', Validators.required]
        // });

    }

    public domain_tree: any;
    public error: any;
    public domain_desc: any;
    public globelTitle: '全部';
    public domain_id: number = 0;
    public globelMsg: any;
    public msgShow: any;
    public modalTarget: any;
    public nodeList: any;

    public searchText = "";
    public default_lang=Lang.default_lang;
    public lang=Lang.langs;
    openModal(target): void {
        if (this.nodeList) {
            this.domains_info = this.fbld.group({
                id: [this.nodeList.data.tag, Validators.required],
                name: [this.nodeList.data.name, Validators.required],
                desc: [this.nodeList.data.desc, Validators.required]
            });
        }
        this.modalTarget = target;
        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.resetDomainInfo();
    }

    //初始化
    ngOnInit(): void {

        this.getDomainTree();
        this.route.params.subscribe((params: Params) => {
          this.default_lang = params["lang"];
        })
        console.log(this.route.params);
    }

    //获取module树
    getDomainTree(): void {
        this.service.getDomainTree().subscribe(
            domain_tree => {
                this.domain_tree = domain_tree.domains;

            },
            error => {
                let domains = [
                    {
                        "id": 1,
                        "name": "运营商A运营商A运营商A运营商A运营商A",
                        "desc": "texttexttexttexttexttexttexttext1",
                        "children": [
                            {
                                "id": 2,
                                "name": "浙江",
                                "desc": "texttexttexttexttexttexttexttext2",
                                "children": []
                            },
                            {
                                "id": 3,
                                "name": "江苏",
                                "desc": "texttexttexttexttexttexttexttext3",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "name": "企业用户A",
                        "desc": "texttexttexttexttexttexttexttext4",
                        "children": [
                            {
                                "id": 27,
                                "name": "部门1",
                                "desc": "texttexttexttexttexttexttexttext5",
                                "children": []
                            },
                            {
                                "id": 28,
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

    getDomainFaq(node: any): void {
        //console.log(data);
        this.nodeList = node;
        this.domain_desc = node.data.desc;
        this.globelTitle = node.data.name;
        this.domain_id = node.data.id;

    }

    //添加域
    addDomain(): void {
        let domain_id = this.domain_id;
        let addData = this.domains_info;
        console.log(this.domains_info);
        this.service.addDomain(addData, domain_id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "添加成功！";
                    //500毫秒隐藏
                    this.setTimeOut();

                    //初始化form,清空input
                    this.resetDomainInfo();
                    this.domain_desc = "";
                    //添加成功,刷新module树;
                    this.getDomainTree();
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

    //修改域
    editDomain(): void {
        let domain_id = this.domain_id;
        let editData = this.domains_info;
        this.service.editDomain(editData, domain_id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "修改成功！";

                    //500毫秒隐藏
                    this.setTimeOut();

                    this.domain_desc = this.domains_info.controls['desc'].value;
                    this.nodeList.data.name = this.domains_info.controls['name'].value;
                    this.nodeList.data.desc = this.domains_info.controls['desc'].value;
                    //初始化form,清空input
                    this.resetDomainInfo();

                    //添加成功,刷新module树;
                    this.getDomainTree();
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

    //删除域
    delDomain(): void {
        let domain_id = this.domain_id;
        this.service.delDomain(domain_id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "删除成功！";

                    //500毫秒隐藏
                    this.setTimeOut();

                    //初始化form,清空input
                    this.resetDomainInfo();

                    //添加成功,刷新module树;
                    this.getDomainTree();
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

    //查询域
    searchDomain(tree: any): void {

        let searchText = this.searchText;
        if (searchText != "") {
            tree.treeModel.filterNodes(searchText);
        }else{

            tree.treeModel. clearFilter();
        }

        // tree.treeModel.isLeaf=true;
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

    resetDomainInfo(): void {
        this.domains_info.reset();
    }

    getModalTarget(target): void {
        target.show();
        this.modalTarget = target;
    }


}
