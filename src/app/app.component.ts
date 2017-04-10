import {Component, AfterViewInit} from '@angular/core';

import {PreLoader} from './preLoader.service';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>
    `
})
export class AppComponent implements AfterViewInit {

    constructor(private _spinner: PreLoader) {
    }

    public ngAfterViewInit(): void {
        this._spinner.hide();
    }

}
