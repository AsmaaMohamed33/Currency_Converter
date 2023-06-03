import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sideNavItem!: MatSidenav;
  eur = 'EUR'
  gbp = 'GBP'
  usd = 'USD'
  fromName = 'Euro';

  constructor(private router: Router) { }

  openSidebar() {
    this.sideNavItem.toggle();
  }

  EURtoGBP() {
    localStorage.setItem("from", this.eur)
    localStorage.setItem("to", this.gbp)
    localStorage.setItem("fromName", this.fromName)
    this.router.navigate(['/details']);

  }

  EURtoUSD() {
    localStorage.setItem("from", this.eur)
    localStorage.setItem("to", this.usd)
    localStorage.setItem("fromName", this.fromName)
    this.router.navigate(['/details']);

  }



}
