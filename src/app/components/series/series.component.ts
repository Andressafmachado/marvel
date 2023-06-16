import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  public dataSource: any;
  public dataCount: any;
  displayedColumns: string[] = ['id', 'title'];

  constructor(private route: ActivatedRoute, private _heroesService: HeroesService) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    const characSub = this._heroesService.getSeriesByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
  };
}
