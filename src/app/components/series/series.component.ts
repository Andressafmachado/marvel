import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit, OnDestroy {
  public dataSource: any;
  public dataCount: any;
  private openSubscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'title'];

  constructor(private route: ActivatedRoute, private _heroesService: HeroesService) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    const serieSub = this._heroesService.getSeriesByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
    this.openSubscriptions.push(serieSub);
  };

  ngOnDestroy(): void {
    this.openSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
