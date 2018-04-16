import { Component, ViewChild, OnInit } from '@angular/core';
import {SidenavService} from './sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('sideNav') public sideNav;
  title = 'Gestock';
  
  constructor (public sideNavService: SidenavService){
    
  }

  ngOnInit() {
    this.sideNavService.sideNav=this.sideNav;
  }
}