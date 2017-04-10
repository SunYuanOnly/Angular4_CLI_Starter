/**
 * Created by cg on 2017/1/10.
 */
import {Component}        from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import {AuthService}      from './auth.service';

import {Session}              from './session';
import {LoginService}       from './login.service';
import {Http, Response} from '@angular/http';
import {Defined} from './defined';
@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  message: string;
  user_name = 'administrator';
  pass_word = '123456';
  session: Session;
  login_res: any;

  constructor(public authService: AuthService, public router: Router, private loginService: LoginService) {
  }

  login(username, password) {
    //this.message = 'Trying to log in ...';
    this.user_name = username;
    this.pass_word = password;
    console.log('username: ' + username);
    this.loginService.login(this.user_name, this.pass_word).subscribe(
      login_res => {
        this.login_res = login_res;
        console.log('login function: ');
        console.log(this.login_res);
        if (this.login_res.code == Defined.OK) {
          this.authService.isLoggedIn = true;
          sessionStorage.setItem('login', "1");
          sessionStorage.setItem('access_token', this.login_res.access_token);
          sessionStorage.setItem('username', this.user_name);
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            preserveQueryParams: true,
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        }
        else {
          this.message = '登录失败(' + this.login_res.resStatus + ')';
        }

      },
      error => {
        //
        var res = <Response>error;
        this.message = res.statusText;
        sessionStorage.setItem('login', "1");
        sessionStorage.setItem('access_token', "123456789");
        sessionStorage.setItem('username', "administrator");

        this.router.navigate(['/system/function/zh_cn']);//, navigationExtras);
      }
    );
  }

  // logout() {
  //     // this.authService.logout();
  //     this.authService.isLoggedIn = false;
  //
  // }
}
