/**
 * Created by sy on 2017/1/11.
 */
import { NgModule }                 from '@angular/core';

import { SharedModule } from '../shared/shared.module';


import { MachineMngComponent }     from './machine-mng.component';
import { Test } from './test';
import { testTree } from '../shared/testTree';

// import { NotFoundComponent } from '../NotFoundComponent';


import {MachineMngService} from "./machine-mng.service";
import { ServerRoutingModule }      from './server-routing.module';

@NgModule({
    imports: [
        ServerRoutingModule,
        SharedModule,

    ],
    declarations: [
        // NotFoundComponent
        MachineMngComponent,
        Test,
        testTree
    ],
    providers: [
        MachineMngService
    ],
})
export class ServerModule { }
