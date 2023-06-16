import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input()
  public shouldOpenSidebar: boolean = false;

  @ViewChild('drawer') public drawer: MatDrawer

  public tabs = ['Home', 'Characters', 'Comics', 'Events'];
  constructor() { }

  ngOnChanges(changes:SimpleChanges){
    this.shouldOpenSidebar = changes["shouldOpenSidebar"].currentValue;
    this.drawer.toggle();
  }

  ngOnInit(): void {
  }

}
