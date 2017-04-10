/**
 * Created by sy on 2017/3/06.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VendorMngComponent} from './vendor-mng.component';
import {DeviceTypeMngComponent} from './device_type-mng.component';
import {ChlTypeMngComponent} from './chl_type-mng.component';




// import { NotFoundComponent } from '../NotFoundComponent';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'vendor/:lang',
                component: VendorMngComponent,
                data: {
                    title: '厂家管理'
                },
            },
            {
                path: 'type/:lang',
                component: DeviceTypeMngComponent
            },
            {
                path: 'chltype/:lang',
                component: ChlTypeMngComponent
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
export class DeviceRoutingModule {}
