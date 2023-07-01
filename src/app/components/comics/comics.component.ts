import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit, OnDestroy {
  public dataSource: any;
  public dataCount: any;
  public displayedColumns: string[] = ['id', 'title'];
  private openSubscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private _heroesService: HeroesService) {
  }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    const comicsSub = this._heroesService.getComicsByCharacterId(characterId).subscribe({
      next: (res) => {
        this.dataSource = res.data.results;
        this.dataCount = res.data.total;
      }
    })
    this.openSubscriptions.push(comicsSub);
  };

  ngOnDestroy(): void {
    this.openSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
