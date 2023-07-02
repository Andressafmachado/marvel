import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {TableService} from "../../services/table.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public dataSource: any;
  public dataCount: any;
  public displayedColumns: string[] = ['id', 'name'];
  private openSubscriptions: Subscription[] = [];

  constructor(private _heroesService: HeroesService, private _tableService: TableService) {
  }

  ngOnInit(): void {
    const characSub = this._tableService.changes.subscribe((options) => {
      this._heroesService.getCharacters(options).subscribe({
        next: (res) => {
         console.log('options', options)
          this.dataSource = res.data.results
          this.dataCount = res.data.total
        },
        error: (err) => {
          console.log('too fast,',err)
        }
      })
    })
    this.openSubscriptions.push(characSub);
  }

  ngOnDestroy(): void {
    this.openSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
