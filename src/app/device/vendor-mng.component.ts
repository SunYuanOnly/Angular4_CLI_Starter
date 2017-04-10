/**
 * Created by cg on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';
import {VendorMngService} from './vendor-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import any = jasmine.any;
@Component({
    templateUrl: 'vendor-mng.component.html'
})
export class VendorMngComponent implements OnInit {
    public error: any;
    public vendor_list: any;
    vendor_info: FormGroup;


    public globelMsg: any;
    public msgShow: boolean;
    public modalTarget: any;

    constructor(public service: VendorMngService, public fbld: FormBuilder) {
        this.vendor_info = fbld.group({
            id: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    //初始化
    ngOnInit(): void {
        this.getVendorList();
    }


    public getVendorList(){
        this.service.getVendorList().subscribe(
            vendor_list => {
                this.vendor_list = vendor_list.vendors;
                console.log(this.vendor_list);
            },
            error => {
                this.error = error;
                this.vendor_list=[
                    {'id':'pano360','name':'pano360'},
                    {'id':'vveye','name':'杭州威威网络科技有限公司'}
                ]
            }
        );
    }

    //添加厂家信息
    addVendor(): void {
        let data = this.vendor_info.controls;

        this.service.addVendor(data).subscribe(
            result => {

                if (result.code == 10000) {

                    this.globelMsg = "添加成功！";

                    this.vendor_info = this.fbld.group({
                        id: ['', Validators.required],
                        name: ['', Validators.required]
                    });

                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getVendorList();

                } else {
                    this.ByCodeMsg(result);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error
            }
        );
    }

    //修改厂家信息
    editVendor(): void {
        let data = this.vendor_info.controls;

        this.service.editVendor(data).subscribe(
            funItem => {
                if (funItem.code == 10000) {

                    this.globelMsg = "修改成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getVendorList();

                } else {
                    this.ByCodeMsg(funItem);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error
            }
        );

    }

    //删除厂家
    removeVendor(id: string): void {
        this.service.removeVendor(id).subscribe(
            funItem => {
                if (funItem.code == 10000) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getVendorList();
                } else {
                    this.ByCodeMsg(funItem);
                }

                //显示提示消息
                this.msgShow = true;
            },
            error => {
                this.error = error
            }
        );
    }

    openModal(target, data): void {

        if (data) {
            this.vendor_info = this.fbld.group({
                id: [data.id, Validators.required],
                name: [data.name, Validators.required]
            });
        }


        this.modalTarget = target;

        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.vendor_info = this.fbld.group({
            id: ['', Validators.required],
            name: ['', Validators.required]
        });
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

    //返回消息
    ByCodeMsg(obj): void {
        switch (obj.code) {
            case 10001:
                this.globelMsg = "重复插入数据！";
                break;
            case 11000:
                this.globelMsg = "尚未登录！";
                break;
            case 11001:
                this.globelMsg = "没有权限！";
                break;
            case 11100:
                this.globelMsg = "内部错误！";
                break;
        }
    }
}
