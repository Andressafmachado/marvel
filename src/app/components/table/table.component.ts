import {AfterViewInit, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {merge, Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnDestroy {
  @Input()
  public dataSource: any;

  @Input()
  public resultsLength = 0;
  @Input()
  public displayedColumns: string[];

  private openSubscriptions: Subscription[] = [];

  constructor(private _tableService: TableService, private _router: Router) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    const sortSub = this.sort.sortChange.subscribe((res) => {
      this.paginator.pageIndex = 0;
      this.dataSource.sort.direction = res.direction;
      this.dataSource.sort.active = res.active;
    })

    const changesSub = merge(this.sort?.sortChange, this.paginator.page)
      .subscribe(() => {
        this._tableService.changes.next({
          sort: this.sort,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        });
      })
    this.openSubscriptions.push(sortSub, changesSub);
  }

  ngOnDestroy(): void{
    this.openSubscriptions.forEach(sub => sub.unsubscribe())
  }
}
