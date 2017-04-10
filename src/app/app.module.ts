import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module';
import {CustomFormsModule} from 'ng2-validation'
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';


// Routing Module
import {AppRoutingModule} from './app.routing';

import {NotFoundComponent} from './NotFoundComponent';
import {ResetPassComponent} from './reset_pass.component';

import {LoginRoutingModule}   from './login.routing';
import {LoginComponent}       from './login.component';

import {DropdownModule} from 'ng2-bootstrap/dropdown';
import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';


//Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {FullLayoutService} from './layouts/full-layout.service';
import {ResetPassService} from './reset_pass.service';
import {PreLoader} from './preLoader.service';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        DropdownModule.forRoot(),
        LoginRoutingModule,
        CustomFormsModule,
        SharedModule,

    ],
    declarations: [
        AppComponent,
        LoginComponent,
        FullLayoutComponent,
        NotFoundComponent,
        ResetPassComponent,
        NAV_DROPDOWN_DIRECTIVES
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        FullLayoutService,
        ResetPassService,
        PreLoader
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

