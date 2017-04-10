/**
 * Created by cg on 2017/1/11.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunctionMngComponent } from './function-mng.component';
import { DomainMngComponent }       from './domain-mng.component';
import { LanguageMngComponent }       from './language-mng.component';
import { TemplateTypeMngComponent }       from './template_type-mng.component';
import { Lang }       from '../lang';
// import { NotFoundComponent } from '../NotFoundComponent';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'function/:lang',
                component: FunctionMngComponent
            },
            {
                path: 'domain/:lang',
                component: DomainMngComponent
            },
            {
                path: 'language/:lang',
                component: LanguageMngComponent
            },
            {
                path: 'template_type/:lang',
                component: TemplateTypeMngComponent
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
export class SystemRoutingModule {}
