import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
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


  public changes: Subject<ITableOptions> = new Subject<ITableOptions>();

  constructor() {
  }
}
