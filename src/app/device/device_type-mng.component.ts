/**
 * Created by sy on 2017/3/06.
 */
import {Component, OnInit} from '@angular/core';
import {DeviceTypeMngService} from './device_type-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
    templateUrl: 'device_type-mng.component.html',
    styles: [`.red{color:red;}`]
})
export class DeviceTypeMngComponent implements OnInit {


    public error: any;
    public device_type_list: any;
    device_type_info: FormGroup;

    constructor(public service: DeviceTypeMngService, public fbld: FormBuilder) {
        this.device_type_info = fbld.group({
            id: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    public globelMsg: any;
    public msgShow: boolean;
    public modalTarget: any;




    //初始化
    ngOnInit(): void {
        this.getDeviceTypeList();
    }


    openModal(target, data): void {

        if (data != "") {
            this.device_type_info = this.fbld.group({
                id: [data.id, Validators.required],
                name: [data.name, Validators.required]
            });

        }

        this.modalTarget = target;

        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.device_type_info.reset();
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

    //获取模版类型列表
    getDeviceTypeList(): void {
        this.service.getDeviceTypeList().subscribe(
            device_type_list => {
                if (device_type_list.code == Defined.OK) {
                    this.device_type_list = device_type_list.types;

                }
            },
            error => {
                this.error = error;
                this.device_type_list = [
                    {'id': 'zh_cn', 'name': '简体中文'},
                    {'id': 'en', 'name': '英文'}
                ]
            }
        );
    }

    //添加语言类别
    addDeviceType(): void {
        let data = this.device_type_info.controls;

        this.service.addDeviceType(data).subscribe(
            result => {

                if (result.code == Defined.OK) {

                    this.globelMsg = "添加成功！";

                    this.device_type_info.reset();
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getDeviceTypeList();

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

    //修改语言信息
    editDeviceType(): void {
        let data = this.device_type_info.controls;

        this.service.editDeviceType(data).subscribe(
            result => {
                if (result.code == Defined.OK) {

                    this.globelMsg = "修改成功！";

                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getDeviceTypeList();

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

    removeDeviceType(id: string): void {
        this.service.removeDeviceType(id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getDeviceTypeList();
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
