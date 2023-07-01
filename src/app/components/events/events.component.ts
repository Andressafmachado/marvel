import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  public dataSource: any;
  public dataCount: any;
  public displayedColumns: string[] = ['id', 'title'];
  private openSubscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private _heroesService: HeroesService) {
  }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    console.log('characterId', characterId)
    const eventsSub = this._heroesService.getEventsByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
    this.openSubscriptions.push(eventsSub)
  };

  ngOnDestroy() {
    this.openSubscriptions.forEach(sub => sub.unsubscribe());
  }

}
