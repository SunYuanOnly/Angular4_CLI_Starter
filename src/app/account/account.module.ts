/**
 * Created by cg on 2017/1/11.
 */
import { NgModule }                 from '@angular/core';

//Module

import { SharedModule } from '../shared/shared.module';

//Component
import { RoleMngComponent }     from './role-mng.component';
import { UserMngComponent }       from './user-mng.component';

import { ApplicationMngComponent } from './application-mng.component';

// Components Routing
import { AccountRoutingModule }      from './account-routing.module';


//service
import { ApplicationMngService } from './application-mng.service';
import {RoleMngService} from "./role-mng.service";
import {UserMngService} from "./user-mng.service";


@NgModule({
    imports: [
        AccountRoutingModule,
        SharedModule
    ],
    declarations: [
        RoleMngComponent,
        UserMngComponent,
        ApplicationMngComponent,

    ],
    providers: [
        ApplicationMngService,
        RoleMngService,
        UserMngService
    ],
})
export class AccountModule { }
