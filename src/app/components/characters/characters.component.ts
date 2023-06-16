import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  public character: any;

  constructor(private route: ActivatedRoute, private _heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    const characSub = this._heroesService.getCharacterById(characterId).subscribe({
      next: (res) => {
        console.log('character',res)
        this.character = res.data.results[0];
      }
    })
  };

}
