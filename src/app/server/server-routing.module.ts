/**
 * Created by sy on 2017/1/11.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MachineMngComponent } from './machine-mng.component';
import { Test } from './test';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'machine/:lang',
                component: MachineMngComponent

            },
            {
                path: 'test/:lang',
                component: Test
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
export class ServerRoutingModule {
}
