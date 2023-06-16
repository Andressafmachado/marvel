import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  public sideBarButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public shouldOpen = false;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public openSideBar():void {
      this.shouldOpen = !this.shouldOpen;
      this.sideBarButtonClick.emit(this.shouldOpen);
  }
}
