import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CategoryService } from '../../service/category.service';
import { Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CapitalisePipe } from '../../common/pipe/custom.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    AsyncPipe,
    MatIconModule,
    ReactiveFormsModule,
    CapitalisePipe,
  ],
})
export class CategoryComponent implements OnInit {
  searchForm = this.fb.group({ search: [''] });
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  length: number = 10;
  pageSize: number = 10;
  pageIndex: any = 1;
  pageEvent: PageEvent = {
    length: this.length,
    pageSize: this.pageSize,
    pageIndex: this.pageIndex,
  };
  dataSource$ = new MatTableDataSource();
  handlePageEvent(e: PageEvent) {
    console.log(e);

    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.sortData({ page: e.pageIndex + 1, limit: e.pageSize });
  }

  initialSortOption: SortingState | null = {
    page: 1,
    limit: 10,
    sortOrder: '',
    sortBy: '',
    search: '',
  };

  displayedColumns: string[] = [
    'image',
    'name',
    'about',
    'subCategoryCount',
    'action',
  ];
  // dataSource$ = new Observable<any>();
  dataLength: number = 0;
  ngOnInit(): void {
    this.getData(this.initialSortOption as SortingState);
  }

  getData(sortOption: SortingState) {
    console.log(sortOption);
    this.categoryService
      .getAllCategories(sortOption)
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
          this.dataLength = res.data.total_records;
          this.dataSource$ = new MatTableDataSource(res.data.list);
        },
      });
  }

  sortData(options: Partial<SortingState>) {
    // console.log(this.initialSortOption);
    // console.log(options);
    if (options.sortBy && this.initialSortOption?.sortBy === options.sortBy) {
      if (this.initialSortOption?.sortOrder === '') {
        (this.initialSortOption as SortingState).sortOrder = 'ASC';
      } else if (this.initialSortOption?.sortOrder === 'ASC') {
        (this.initialSortOption as SortingState).sortOrder = 'DESC';
      } else {
        (this.initialSortOption as SortingState).sortOrder = '';
      }
    } else if (
      options.sortBy &&
      this.initialSortOption?.sortOrder !== options.sortBy
    ) {
      (this.initialSortOption as SortingState).sortOrder = 'ASC';
    }

    this.initialSortOption = {
      ...this.initialSortOption,
      ...options,
    } as SortingState;
    console.log('last log', this.initialSortOption);
    this.getData(this.initialSortOption);
  }

  formHandle() {
    const text = this.searchForm.value.search;
    this.getData({ ...this.initialSortOption, search: text } as SortingState);
  }

  view(id: string) {
    this.router.navigate(['category/view', id]);
  }

  edit(id: string) {
    this.router.navigate(['category/update', id]);
    console.log(`edit ${id}`);
  }

  deleteCategory(id: string) {
    console.log(`delete ${id}`);
  }

  createCategory() {
    this.router.navigate(['category/create']);
  }
}

interface SortingState {
  page: number;
  limit: number;
  sortOrder: 'ASC' | 'DESC' | '';
  sortBy: string;
  search: string;
}
