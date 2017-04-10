/**
 * Created by sy on 2017/3/2.
 */
import {Component, OnInit} from '@angular/core';
import {TemplateTypeMngService} from './template_type-mng.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Defined} from '../defined';
@Component({
  templateUrl: 'template_type-mng.component.html',
  styles: [`.red{color:red;}`]
})
export class TemplateTypeMngComponent implements OnInit {


  public error: any;
  public template_type_list: any;
  template_type_info: FormGroup;

  constructor(public service: TemplateTypeMngService, public fbld: FormBuilder) {
    this.template_type_info = fbld.group({
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
    this.getTemplateTypeList();
  }


  openModal(target, data): void {

    if (data != "") {
      this.template_type_info = this.fbld.group({
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
    this.template_type_info.reset();
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
          {'id': 'zh_cn', 'name': '简体中文'},
          {'id': 'en', 'name': '英文'}
        ]
      }
    );
  }

  //添加语言类别
  addTemplateType(): void {
    let data = this.template_type_info.controls;

    this.service.addTemplateType(data).subscribe(
      result => {

        if (result.code == Defined.OK) {

          this.globelMsg = "添加成功！";

          this.template_type_info.reset();
          //500毫秒隐藏modal
          this.setTimeOut();
          this.getTemplateTypeList();

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
  editTemplateType(): void {
    let data = this.template_type_info.controls;

    this.service.editTemplateType(data).subscribe(
      result => {
        if (result.code == Defined.OK) {

          this.globelMsg = "修改成功！";

          //500毫秒隐藏modal
          this.setTimeOut();
          this.getTemplateTypeList();

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

  removeTemplateType(id: string): void {
    this.service.removeTemplateType(id).subscribe(
      result => {
        if (result.code == Defined.OK) {
          this.globelMsg = "删除成功！";
          //500毫秒隐藏modal
          this.setTimeOut();
          this.getTemplateTypeList();
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
