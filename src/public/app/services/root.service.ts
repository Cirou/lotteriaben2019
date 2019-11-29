import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RootService {

    private _mocked: boolean = false;

    constructor() {
    }

    public get logged(): boolean {
        return this.getSessionField("logged");
    }
    public set logged(value: boolean) {
        this.setSessionField("logged", value);
    }

    public get mocked(): boolean {
        return this._mocked;
    }
    public set mocked(value: boolean) {
        this._mocked = value;
    }

    private getSessionField(fieldName: string): boolean {
        return sessionStorage.getItem(fieldName) && sessionStorage.getItem(fieldName) === 'true';
    }

    private setSessionField(fieldName: string, value: boolean) {
        sessionStorage.setItem(fieldName, value + '');
    }
}
