import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let httpOptions: any = {
            'Content-Type': 'application/json'
        }
        if (this.authService.identity) {
            httpOptions = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.identity.Token
            }
        }
        const authReq = req.clone({
            headers: new HttpHeaders(httpOptions)
        });

        return next.handle(authReq).pipe(tap(
            (response: any) => {
                // nothing to do there
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    window.location.href = '/login';
                }
            }
        ));
    }
}