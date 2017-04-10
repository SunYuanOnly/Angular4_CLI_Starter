import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CanDeactivateGuard} from './can-deactivate-guard.service';
import {AuthGuard}          from './auth-guard.service';
import {PreloadSelectedModules} from './selective-preload-strategy';

//Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {NotFoundComponent} from './NotFoundComponent';
import {ResetPassComponent} from './reset_pass.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'system/function/zh_cn',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'system',
        loadChildren: 'app/system/system.module#SystemModule',
        canLoad: [AuthGuard],
        data: {
          preload: true
        }
      },
      {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule',
        canLoad: [AuthGuard],
        data: {
          preload: true
        }
      },
      {
        path: 'server',
        loadChildren: 'app/server/server.module#ServerModule',
        canLoad: [AuthGuard],
        data: {
          preload: true
        }
      },
      {
        path: 'device',
        loadChildren: 'app/device/device.module#DeviceModule',
        canLoad: [AuthGuard],
        data: {
          preload: true
        }
      },
      {
        path: '404',
        component: NotFoundComponent,
        canLoad: [AuthGuard],
        data: {
          preload: true
        }
      }
    ]
  },
  {
    path: 'reset_pass',
    component: ResetPassComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {

}
