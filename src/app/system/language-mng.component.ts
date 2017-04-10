/**
 * Created by sy on 2017/3/2.
 */
import {Component, OnInit} from '@angular/core';
import {LanguageMngService} from './language-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
    templateUrl: 'language-mng.component.html',
    styles: [`.red{color:red;}`]
})
export class LanguageMngComponent implements OnInit {


    public error: any;
    public language_list: any;
    language_info: FormGroup;

    constructor(public service: LanguageMngService, public fbld: FormBuilder) {
        this.language_info = fbld.group({
            id: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    public globelMsg: any;
    public msgShow: boolean;
    public modalTarget: any;

    public language_id: any;


    //初始化
    ngOnInit(): void {
        this.getLangList();
    }


    openModal(target, data): void {

        if (data != "") {
            this.language_info = this.fbld.group({
                id: [data.id, Validators.required],
                name: [data.name, Validators.required]
            });
            this.language_id = data.id;
        }

        this.modalTarget = target;

        target.show();

    }

    closeModal(target): void {
        target.hide();
        this.language_info.reset();
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

    //获取语言列表
    getLangList(): void {
        this.service.getLangList().subscribe(
            language_list => {
                if (language_list.code == Defined.OK) {
                    this.language_list = language_list.langs;

                }
            },
            error => {
                this.error = error;
                this.language_list = [
                    {'id': 'zh_cn', 'name': '简体中文'},
                    {'id': 'en', 'name': '英文'}
                ]
            }
        );
    }

    //添加语言类别
    addLang(): void {
        let data = this.language_info.controls;

        this.service.addLang(data).subscribe(
            result => {

                if (result.code == Defined.OK) {

                    this.globelMsg = "添加成功！";

                    this.language_info.reset();
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getLangList();

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
    editLang(): void {
        let data = this.language_info.controls;

        this.service.editLang(data).subscribe(
            result => {
                if (result.code == Defined.OK) {

                    this.globelMsg = "修改成功！";

                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getLangList();

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

    //删除语言信息

    removeLang(id: string): void {
        this.service.removeLang(id).subscribe(
            result => {
                if (result.code == Defined.OK) {
                    this.globelMsg = "删除成功！";
                    //500毫秒隐藏modal
                    this.setTimeOut();
                    this.getLangList();
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
