import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  public sideBarButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public shouldOpen = false;
  constructor(private _router: Router) { }

  public openSideBar():void {
      this.shouldOpen = !this.shouldOpen;
      this.sideBarButtonClick.emit(this.shouldOpen);
  }
}
