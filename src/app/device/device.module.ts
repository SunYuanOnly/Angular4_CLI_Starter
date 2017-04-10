/**
 * Created by sy on 2017/3/06.
 */
import { NgModule }                 from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { VendorMngComponent}        from './vendor-mng.component';
import { DeviceTypeMngComponent}        from './device_type-mng.component';
import { ChlTypeMngComponent}        from './chl_type-mng.component';


// Components Routing
import { DeviceRoutingModule }      from './device-routing.module';
import { VendorMngService } from './vendor-mng.service';
import { DeviceTypeMngService } from './device_type-mng.service';
import { ChlTypeMngService } from './chl_type-mng.service';


@NgModule({
    imports: [
        DeviceRoutingModule,
        SharedModule
    ],
    declarations: [
        VendorMngComponent,
        DeviceTypeMngComponent,
        ChlTypeMngComponent
    ],
    providers: [
        VendorMngService,
        DeviceTypeMngService,
        ChlTypeMngService

    ]
})
export class DeviceModule { }
