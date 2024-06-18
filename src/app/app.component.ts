import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/service/auth.service';
import { tap } from 'rxjs';
import { StorageService } from './service/storage-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    RouterOutlet,
    MatDividerModule,
    MatGridListModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class AppComponent {
  title = 'angular-assessment';
  isAuthRoute: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private storage: StorageService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthRoute = event.url.startsWith('/auth');
      }
    });
  }

  logout() {
    this.authService
      .logout()
      .pipe(
        tap({
          error: (err) => {
            console.log(err);
          },
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.storage.removeData();
            this.router.navigate(['auth/signin']);
          }
        },
      });
  }

  changePassword() {
    this.router.navigate(['changePassword']);
  }
}
