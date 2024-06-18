import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardService } from '../service/dashboard.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [SidebarComponent, CommonModule],
})
export class DashboardComponent {
  dashboardData: any;
  constructor(private dashboardService: DashboardService) {
    this.dashboardService
      .getDashBoardData()
      .pipe(tap({ error: (err) => console.log(err) }))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.dashboardData = res.data;
        },
      });
  }
}
