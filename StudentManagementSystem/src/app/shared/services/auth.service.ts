import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
// import axios, { AxiosResponse } from 'axios';
import { GlobalService } from './global.service';
import { StateManagementService } from './state.management.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    // private
    private url = this.globalService.baseApiUrl + '/auth';

    // public
    public authState: any;
    public identity: any;
    public identityBehaviour: BehaviorSubject<any>;

    public constructor(
        public globalService: GlobalService,
        public http: HttpClient,
        private stateManager: StateManagementService
    ) {
        this.identity = this.stateManager.get('current-user');
        this.identityBehaviour = new BehaviorSubject<any>(this.identity);
        if (this.identity) {
            this.identityBehaviour = new BehaviorSubject<any>(this.identity);
            if (this.identity != null && this.identity.Token != null) {
                this.authState = true;
            }
        }
    }

    getData(): any {
        return this.stateManager.get('auth-data');
    }

    login(credentials: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.url, credentials).subscribe(
                (response: any) => {
                    console.log(response);
                    const data = response.data;
                    if (response.ResponseCode === 200) {
                        this.stateManager.save({ name: 'current-user', value: response.Details });
                        this.identity = response.Details;
                        this.identityBehaviour.next(this.identity);
                        this.authState = this.identity ? true : false;
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error => reject(error)
            );
        });
    }

    authorize(): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            this.http.post(this.url + '/authorize', this.identity, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.identity.Token
                }
            }).subscribe(
                (response: any) => {
                    console.log(response);
                    const data = response.data;
                    if (response.ResponseCode === 200) {
                        // this.stateManager.save({ name: 'current-user', value: response.Details });
                        // this.identity = response.Details;
                        // this.identityBehaviour.next(this.identity);
                        // this.authState = this.identity ? true : false;
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error => reject(error)
            );
        });
    }

    logout(): Promise<any> {
        const promise: any = new Promise((resolve: any, reject: any) => {
            resolve({})
        });
        return promise.then((response: any) => {
            this.stateManager.remove('current-user')
            window.location.href = '/';
        }).catch((error) => { });
    }

    verifyEmail(credentials: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/verify-email', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe(
                (response: any) => {
                    if (response.ResponseCode === 200) {
                        // this.stateManager.save({ name: 'auth-data', value: data });
                        // this.identity = data.Details;
                        // this.authState = this.identity ? true : false;
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error => reject(error)
            );
        });
    }

}