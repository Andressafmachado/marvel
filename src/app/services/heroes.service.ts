import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";
import {ITableOptions} from "./table.service";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private _apiService: ApiService) {
  }


  public getCharacters(options?: any): Observable<any> {
    let endpoint = '';
    let param = '?';

    // if(options){
       endpoint = this.endpointBuilder('characters', options);
       param = '&'
    // } else {
    //    endpoint = 'characters'
    //   param = '?'
    // }

    return new Observable((observer) => {
      this._apiService.get(endpoint, param).subscribe({
        next: (res) => {
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
          observer.complete();
        }

      });
    });
  }

  public getCharacterById(id: string | null): Observable<any> {
    return new Observable((observer) => {
      const endpoint = `characters/${id}`;

      this._apiService.get(endpoint).subscribe((res) => {
        console.log('by id', res)
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getComicsByCharacterId(id: string | null): Observable<any> {
    return new Observable((observer) => {
      const endpoint = `characters/${id}/comics`;

      this._apiService.get(endpoint).subscribe((res) => {
        console.log('comic by id', res)
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getEventsByCharacterId(id: string | null): Observable<any> {
    return new Observable((observer) => {
      const endpoint = `characters/${id}/events`;

      this._apiService.get(endpoint).subscribe((res) => {
        console.log('events by id', res)
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getSeriesByCharacterId(id: string | null): Observable<any> {
    return new Observable((observer) => {
      const endpoint = `characters/${id}/series`;

      this._apiService.get(endpoint).subscribe((res) => {
        console.log('series by id', res)
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getStoriesByCharacterId(id: string | null): Observable<any> {
    return new Observable((observer) => {
      const endpoint = `characters/${id}/stories`;

      this._apiService.get(endpoint).subscribe((res) => {
        console.log('stories by id', res)
        observer.next(res);
        observer.complete();
      });
    });
  }


  private endpointBuilder(endpoint: string, tableOptions: ITableOptions): string {
    return `${endpoint}?orderBy=${tableOptions.sort.active}&limit=${tableOptions.pageSize}&offset=${tableOptions.pageIndex * tableOptions.pageSize}&`;
  }
}
