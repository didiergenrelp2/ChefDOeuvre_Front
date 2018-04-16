import { Injectable } from '@angular/core';

@Injectable()
export class SidenavService {
  sideNav: any;


  constructor() {}

  toggleNav() {
    this.sideNav.toggle();
    console.log(this.sideNav);
  }
}
