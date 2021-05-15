import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    protected baseUrl = environment.api;
    private header = new HttpHeaders();


    constructor(
        private http: HttpClient
    ) { }


    postEmployee = (data: any) => {
        return this.http.post(this.baseUrl+'/employee', data, {headers: this.header});
    }

    getEmployee = (page: string,filter: string) => {
        return this.http.get(this.baseUrl+'/employee'+page+filter, {headers: this.header});
    }

    putEmployee = (id:number, data: any) => {
        return this.http.put(this.baseUrl+'/employee/'+id, data,  {headers: this.header});
    }

    deleteEmployee = (id:number) => {
        return this.http.delete(this.baseUrl+'/employee/'+id,  {headers: this.header});
    }
}
