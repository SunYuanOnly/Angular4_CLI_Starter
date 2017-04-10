/**
 * Created by cg on 2017/1/11.
 */
import { NgModule }                 from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FunctionMngComponent }     from './function-mng.component';
import { DomainMngComponent }       from './domain-mng.component';
import { LanguageMngComponent } from './language-mng.component';
import { TemplateTypeMngComponent }       from './template_type-mng.component';


// Components Routing
import { SystemRoutingModule }      from './system-routing.module';
import { FunMngService } from './function-mng.service';
import { DomainMngService } from './domain-mng.service';
import { LanguageMngService } from './language-mng.service';
import { TemplateTypeMngService } from './template_type-mng.service';

@NgModule({
    imports: [
        SystemRoutingModule,
        SharedModule
    ],
    declarations: [
        FunctionMngComponent,
        DomainMngComponent,
        LanguageMngComponent,
        TemplateTypeMngComponent
    ],
    providers: [
        FunMngService,
        DomainMngService,
        LanguageMngService,
        TemplateTypeMngService
    ]
})
export class SystemModule { }
