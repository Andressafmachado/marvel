import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  public character: any;
  private openSubscriptions: Subscription[] = [];


  constructor(private route: ActivatedRoute, private _heroesService: HeroesService) {
  }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    const characSub = this._heroesService.getCharacterById(characterId).subscribe({
      next: (res) => {
        this.character = res.data.results[0];
      }
    })
    this.openSubscriptions.push(characSub);
  };

  ngOnDestroy(): void {
    this.openSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
