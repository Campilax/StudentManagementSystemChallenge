import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/shared/services/global.service';

@Injectable()
export class StudentService {
    public createOrEditDialog = new Subject<any>();
    public onOkay = new Subject<void>();

    private url = this.globals.baseApiUrl + '/students';

    public constructor(
        public http: HttpClient,
        public globals: GlobalService
    ) {
        //
    }

    showDialog(params?: any, callback?: any) {
        this.createOrEditDialog.next({
            data: params, callback
        });
    }

    getAll(params?: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/get-students', params).subscribe(
                (response: any) => {
                    if (response.ResponseCode === 200) {
                        resolve({
                            data: response.List,
                            page: {
                                QueryString: response.QueryString,
                                PageNumber: response.PageNumber,
                                RowsPerPage: response.RowsPerPage,
                                Total: response.Total,
                                TotalPages: response.TotalPages
                            }
                        });
                    }
                    else {
                        reject(response);
                    }
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    get(param: any): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/' + param).subscribe(
                (response: any) => {
                    if (response.ResponseCode === 200) {
                        resolve(response.Details);
                    }
                    else {
                        reject(response);
                    }
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    downloadFileAsCSV(): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/download-csv-file', {
                responseType: 'blob'
            }).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    save(params?: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url, params).subscribe(
                (response: any) => {
                    if (response.ResponseCode === 200) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    update(params?: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/update', params).subscribe(
                (response: any) => {
                    if (response.ResponseCode === 200) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    delete(params?: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/delete', params).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    deleteById(idParam?: any): any {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/delete/' + idParam).subscribe(
                (response: any) => {
                    resolve(response);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

}