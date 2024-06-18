import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { CapitalisePipe } from 'src/app/common/pipe/custom.pipe';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-view',
  standalone: true,
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    CapitalisePipe,
  ],
})
export class CategoryViewComponent implements OnInit {
  id: string = '';
  categoryData: any;
  constructor(
    private route: ActivatedRoute,
    private readonly categoryService: CategoryService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService
      .getCategory(this.id)
      .pipe(
        tap({
          error: (err) => {
            console.log(err);
          },
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.categoryData = res.data;
        },
      });
  }
}
