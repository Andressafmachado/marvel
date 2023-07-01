import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private publicKey = '2d8a67c2de6703b3744ee8a0099ae23f';
  private privateKey = 'a3c85a363839f991736225098624f66cae1c2229';
  private getStamp(): number {
    return new Date().getTime()
  }

  private secret(): string {
    return`${this.getStamp()}${this.privateKey}${this.publicKey}`
  }

  private encripted(){
    return CryptoJS.MD5(this.secret());
  }

  private credentials(): string{
    return `apikey=${this.publicKey}&hash=${this.encripted().toString()}&ts=${this.getStamp()}`
  }

  public post(endpoint: string, payload: any, options?: any): Observable<any> {
        return this.http.post(
            `${endpoint}`,
            payload,
            options
        );
    }

    public get(endpoint: string, param = '?', headers?: any): Observable<any> {
        return this.http.get(
          `${this.baseUrl}/${endpoint}${param}${this.credentials()}`
        );
    }

    public update(endpoint: string, payload: any): Observable<any> {
        return this.http.put(
            `${endpoint}`,
            payload
        );
    }

    public patch(endpoint: string, payload: any): Observable<any> {
        return this.http.patch(
            `${endpoint}`,
            payload
        );
    }

    public delete(endpoint: string): Observable<any> {
        return this.http.delete(
            `${endpoint}`
        );
    }

    public externalPost(url: string, payload: any): Observable<any> {
        return this.http.post(url, payload, {
            headers: { 'content-type': 'application/json', 'skip': 'true' },
        });
    }

    public externalGet(url: string): Observable<any> {
        return this.http.get(url, {
            headers: { 'content-type': 'application/json', 'skip': 'true' },
        });
    }
}
