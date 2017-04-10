/**
 * Created by sy on 2017/3/08.
 */
import {Component, OnInit} from '@angular/core';
import {ChlTypeMngService} from './chl_type-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
    templateUrl: 'chl_type-mng.component.html',
    styles: [`.red{color:red;}`]
})
export class ChlTypeMngComponent implements OnInit {


    public error: any;
    public chl_type_list: any;
    chl_type_info: FormGroup;

    constructor(public service: ChlTypeMngService, public fbld: FormBuilder) {
        this.chl_type_info = fbld.group({
            id: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    public globelMsg: any;
    public msgShow: boolean;
    public modalTarget: any;

    //初始化
    ngOnInit(): void {
        this.getChlTypeList();
    }

    openModal(target, data): void {

        if (data != "") {
            this.chl_type_info = this.fbld.group({
                id: [data.id, Validators.required],
                name: [data.name, Validators.required]
            });

        }

        this.modalTarget = target;

        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.chl_type_info.reset();
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

    //获取通道类型列表
    getChlTypeList(): void {
        this.service.getChlTypeList().subscribe(
            chl_type_list => {
                if (chl_type_list.code == Defined.OK) {
                    this.chl_type_list = chl_type_list.types;

                }
            },
            error => {
                this.error = error;
                this.chl_type_list = [
                    {'id': 'zh_cn', 'name': '简体中文'},
                    {'id': 'en', 'name': '英文'}
                ]
            }
        );
    }

    //添加通道类别
    addChlType(): void {
        let data = this.chl_type_info.controls;

        this.service.addChlType(data).subscribe(
            result => {

                if (result.code == Defined.OK) {

                    this.globelMsg = "添加成功！";

                    this.chl_type_info.reset();
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getChlTypeList();

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

    //修改通道信息
    editChlType(): void {
        let data = this.chl_type_info.controls;

        this.service.editChlType(data).subscribe(
            result => {
                if (result.code == Defined.OK) {

                    this.globelMsg = "修改成功！";

                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getChlTypeList();

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

    //删除模版类型
    removeChlType(id: string): void {
        this.service.removeChlType(id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getChlTypeList();
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
