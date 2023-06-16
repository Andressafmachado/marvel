import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  public dataSource: any;
  public dataCount: any;
  displayedColumns: string[] = ['id', 'title'];
  constructor(private _route: ActivatedRoute, private _heroesService: HeroesService) { }

  ngOnInit(): void {
    const characterId = this._route.snapshot.paramMap.get('id');
    const characSub = this._heroesService.getSeriesByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
  };

}
