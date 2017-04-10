/**
 * Created by cg on 2017/1/11.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RoleMngComponent} from './role-mng.component';
import {UserMngComponent} from './user-mng.component';

// import { NotFoundComponent } from '../NotFoundComponent';

import {ApplicationMngComponent} from './application-mng.component';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'role/:lang',
                component: RoleMngComponent,
                data: {
                    title: '角色管理'
                },
            },
            {
                path: 'user/:lang',
                component: UserMngComponent,
                data: {
                    title: '用户管理'
                },
            },

            {
                path: 'application/:lang',
                component: ApplicationMngComponent,
                data: {
                    title: '应用管理'
                },
            },
            {
                path: '**',
                redirectTo: '/404',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
