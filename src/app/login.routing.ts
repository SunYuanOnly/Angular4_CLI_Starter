/**
 * Created by cg on 2017/1/10.
 */
import {NgModule}       from '@angular/core';
import {RouterModule}   from '@angular/router';
import {AuthGuard}      from './auth-guard.service';
import {AuthService}    from './auth.service';
import {LoginService}   from  './login.service';
import {LoginComponent} from './login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'login', component: LoginComponent}
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        LoginService,
    ]
})
export class LoginRoutingModule {
}
