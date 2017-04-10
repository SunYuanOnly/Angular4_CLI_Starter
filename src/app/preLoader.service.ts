import {Injectable} from '@angular/core';

@Injectable()
export class PreLoader {

    private _selector: string = 'loader-wrapper';
    private _element: HTMLElement;

    constructor() {
        this._element = document.getElementById(this._selector);
    }

    public show(): void {
        this._element.style['visibility'] = 'visible';
    }

    public hide(delay: number = 0): void {
        setTimeout(() => {
            this._element.style['visibility'] = 'hidden';
            this._element.style['transition'] = 'all 0.3s 1s ease-out';
        }, delay);
    }
}
