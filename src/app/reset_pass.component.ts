/**
 * Created by sy on 2017/3/07.
 */

import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ResetPassService} from "./reset_pass.service";
import {Defined} from './defined';
@Component({
    templateUrl: 'reset_pass.component.html',
    styles: [`
        h2
        {
            text-align: center;
            color: #666;
            padding:3px 0 3px 0;
            letter-spacing: 4px;
            font: normal 22px/1 Verdana, Helvetica;
            position: relative;
        }
        .red{
            color:red;
        }
    `]
})
export class ResetPassComponent implements OnInit {

    public _title: string;
    public pwdHtml: string;
    public rpwdHtml: string;
    public submitText: string;
    private vcode: string;
    private email: string;
    private pwd_error_message: string;
    private rpwd_error_message: string;
    public globelMsg: any;
    public msgShow: any;
    private error: any;
    constructor(@Inject(ActivatedRoute) public router: ActivatedRoute, private service: ResetPassService ) {
    }

    ngOnInit(): void {
        this.router.queryParams.subscribe((params: Params) => {
            let lang = params['lang'];
            this.email = params['email'];
            this.vcode = params['vcode'];
            if (lang == "en") {

                this._title = 'Reset password';
                this.pwdHtml = 'Password';
                this.rpwdHtml = 'ConfirmPassword';
                this.submitText = 'Submit';
                this.pwd_error_message="Please enter at least {6} characters.";
                this.rpwd_error_message="Please enter the same value again."

            } else {
                this._title = '重置密码';
                this.pwdHtml = '密码';
                this.rpwdHtml = '确认密码';
                this.submitText = '提交';
                this.pwd_error_message="密码长度不能小于6位，大于16位";
                this.rpwd_error_message="两次密码输入不一致"
            }
        });

    }

    resetPassword(form,pwd): void {
       console.log(pwd);
        this.service.resetPassword(this.email, this.vcode, pwd).subscribe(
            result => {

                if (result.code == Defined.OK) {

                    this.globelMsg = "添加成功！";
                    form.reset();

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
}
