import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule}              from 'ng2-bootstrap/modal';

import {EqualValidator} from './equal-validator.directive';
// import {DropdownModule} from 'ng2-bootstrap/dropdown';
import {TabsModule} from 'ng2-bootstrap/tabs';

// import {NAV_DROPDOWN_DIRECTIVES} from './nav-dropdown.directive';

import {SIDEBAR_TOGGLE_DIRECTIVES} from './sidebar.directive';
import {AsideToggleDirective} from './aside.directive';
import {SmartResizeDirective} from './smart-resize.directive';

import {TreeModule} from 'angular2-tree-component';
import {Ng2PaginationModule} from "ng2-pagination";

import {HttpModule} from '@angular/http';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // DropdownModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        TreeModule,
        Ng2PaginationModule
    ],
    declarations: [
        EqualValidator,
        // NAV_DROPDOWN_DIRECTIVES,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        SmartResizeDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        TreeModule,
        EqualValidator,
        Ng2PaginationModule,
        // NAV_DROPDOWN_DIRECTIVES,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        SmartResizeDirective
    ]
})

export class SharedModule {

}
