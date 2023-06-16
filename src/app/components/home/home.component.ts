import { Component, OnInit } from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dataSource: any;
  public dataCount: any;
  displayedColumns: string[] = ['id', 'name'];

  constructor(private _heroesService : HeroesService, private _tableService : TableService) {
  }

  ngOnInit(): void {
    this._heroesService.getCharacters().subscribe((res)=> {
      this.dataSource = res.data.results
      this.dataCount = res.data.total
      console.log('datacount - ', this.dataCount)
    });

    this._tableService.changes.subscribe((options) => {
      console.log('options', options)
      this._heroesService.getCharacters(options).subscribe((res)=> this.dataSource = res.data.results);
    })
  }
}
