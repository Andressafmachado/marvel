import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CharactersComponent} from "./components/characters/characters.component";
import {ComicsComponent} from "./components/comics/comics.component";
import {EventsComponent} from "./components/events/events.component";
import {SeriesComponent} from "./components/series/series.component";
import {StoriesComponent} from "./components/stories/stories.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'characters/:id',
    component: CharactersComponent,
  },
  {
    path: 'characters/:id/series',
    component: SeriesComponent,
  },
  {
    path: 'characters/:id/comics',
    component: ComicsComponent,
  },
  {
    path: 'characters/:id/events',
    component: EventsComponent,
  },
  {
    path: 'characters/:id/stories',
    component: StoriesComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
