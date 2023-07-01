import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Sort} from "@angular/material/sort/sort";

export interface ITableOptions {
  sort: Sort,
  pageIndex: number,
  pageSize: number

}

@Injectable({
  providedIn: 'root'
})
export class TableService {


  public changes: BehaviorSubject<any> = new BehaviorSubject({
    sort: {active: '', direction: ''},
    pageIndex: 0,
    pageSize: 20
  });
}
