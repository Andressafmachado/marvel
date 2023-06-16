// import {HttpClient} from '@angular/common/http';
// import {Component, ViewChild, AfterViewInit, Input, OnInit, OnChanges} from '@angular/core';
// import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
// import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
// import {merge, Observable, of as observableOf} from 'rxjs';
// import {catchError, map, startWith, switchMap} from 'rxjs/operators';
// import {MatTableModule} from '@angular/material/table';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {NgIf, DatePipe} from '@angular/common';
// import {HeroesService} from "../../services/heroes.service";
// import {Sort} from "@angular/material/sort/sort";
// import {TableService} from "../../services/table.service";
//
// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.scss']
// })
// export class TableComponent implements OnChanges, AfterViewInit {
//   @Input()
//   public dataSource: any;
//
//
//   displayedColumns = ['title'];
//   @ViewChild(MatSort) sort: MatSort;
//
//   // displayedColumns: string[] = ['id', 'name',];
//   resultsLength = 0;
//   isLoadingResults = true;
//   isRateLimitReached = false;
//
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//
//   constructor(private _httpClient: HttpClient,
//               private _heroesService: HeroesService,
//               private _tableService: TableService) {
//   }
//
//   ngOnChanges() {
//     console.log('dataSource', this.dataSource)
//   }
//
//
//   ngAfterViewInit() {
//     // If the user changes the sort order, reset back to the first page.
//     this.sort.sortChange.subscribe((res) => {
//
//       (this.paginator.pageIndex = 0)
//       console.log('sort', res)
//     })
//
//     merge(this.sort?.sortChange, this.paginator.page)
//       .subscribe(data => {
//         console.log('data', data)
//         this._tableService.changes.next({
//           sort: this.sort,
//           pageIndex: this.paginator.pageIndex,
//           pageSize: this.paginator.pageSize
//         });
//       })
//   }
// }


import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {merge, startWith} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @Input()
  public dataSource: any;

  @Input()
  resultsLength = 0;
  @Input()
  displayedColumns: string[];

  constructor(private _liveAnnouncer: LiveAnnouncer, private _tableService: TableService, private _router: Router) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    console.log(this.displayedColumns)
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe((res) => {
      (this.paginator.pageIndex = 0)
    })

    merge(this.sort?.sortChange, this.paginator.page)
      .subscribe(data => {
        this._tableService.changes.next({
          sort: this.sort,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        });
      })
  }
}
