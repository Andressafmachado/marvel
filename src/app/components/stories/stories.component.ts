import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {
  public dataSource: any;
  public dataCount: any;
  public displayedColumns: string[] = ['id', 'title'];

  private openSubscriptions: Subscription[] = [];
  constructor(private _route: ActivatedRoute, private _heroesService: HeroesService) { }

  ngOnInit(): void {
    const characterId = this._route.snapshot.paramMap.get('id');
    const storiesSub = this._heroesService.getStoriesByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
    this.openSubscriptions.push(storiesSub);
  };

  ngOnDestroy(): void {
    this.openSubscriptions.forEach(sub => sub.unsubscribe());
  }
}

