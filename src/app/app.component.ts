import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fromZeroToHeroByAndressa';

  public sideBarVisibility: boolean = false;

  public toggleSideBar(visibility: boolean): void {
    this.sideBarVisibility = visibility;
  }

}
