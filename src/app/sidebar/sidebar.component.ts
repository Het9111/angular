import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    CommonModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
})
export class SidebarComponent implements OnInit {
  constructor() {}
  isOpen: boolean = true;
  openList: boolean = false;
  showFiller = false;
  ngOnInit(): void {}
  log(text: string) {
    console.log(text);
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  expandList() {
    this.openList = !this.openList;
  }
  opened = false;

  toggleSidenav() {
    this.opened = !this.opened;
  }
}
