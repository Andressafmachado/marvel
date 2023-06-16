import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public dataSource: any;
  public dataCount: any;
  displayedColumns: string[] = ['id', 'title'];

  constructor(private route: ActivatedRoute, private _heroesService: HeroesService) { }


  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    console.log('characterId',characterId)
    const characSub = this._heroesService.getEventsByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
  };

}
