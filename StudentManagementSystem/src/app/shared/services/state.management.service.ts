import { BaseServiceInterface } from '../interfaces/base.service.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class StateManagementService {

    private stateObject: any;

    public constructor() {
        this.stateObject = window.localStorage;
    }

    public getItems(): any {
        try {
            return this.stateObject;
        } catch (e) {
            throw new Error('Method not implemented.');
        }
    }

    public get(itemName: any): any {
        try {
            return JSON.parse(this.stateObject.getItem(itemName));
        } catch (e) {
            // throw new Error('Method not implemented.');
        }
    }

    public save(item: any): any {
        try {
            return this.stateObject.setItem(item.name, JSON.stringify(item.value));
        } catch (e) {
            // throw new Error('Method not implemented.');
        }
    }

    public update(item: any): any {
        try {
            this.remove(item.name);
            return this.stateObject.setItem(item.name, JSON.stringify(item.value));
        } catch (e) {
            // throw new Error('Method not implemented.');
        }
    }

    public remove(itemName: any): any {
        try {
            return this.stateObject.removeItem(itemName);
        } catch (e) {
            // throw new Error('Method not implemented.');
        }
    }

    public clearAll(): any {
        try {
            return this.stateObject.clear();
        } catch (e) {
            // throw new Error('Method not implemented.');
        }
    }
}
