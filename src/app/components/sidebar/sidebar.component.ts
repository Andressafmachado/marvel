import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {
  @Input()
  public shouldOpenSidebar: boolean = false;

  @ViewChild('drawer') public drawer: MatDrawer

  public tabs = ['Home', 'Characters', 'Comics', 'Events'];
  constructor() { }

  ngOnChanges(changes:SimpleChanges){
    this.shouldOpenSidebar = changes["shouldOpenSidebar"].currentValue;
    this.drawer.toggle();
  }
}
