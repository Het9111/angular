import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './Category/category/category.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CategoryViewComponent } from './Category/category-view/category-view.component';
import { CategoryUpdateComponent } from './Category/category-update/category-update.component';
import { CategoryCreateComponent } from './Category/category-create/category-create.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'category',
    children: [
      { path: '', component: CategoryComponent, title: 'List Category' },
      {
        path: 'create',
        component: CategoryCreateComponent,
        title: 'Create Category',
      },
      {
        path: 'update/:id',
        component: CategoryUpdateComponent,
        title: 'Update Category',
      },
      {
        path: 'view/:id',
        component: CategoryViewComponent,
        title: 'View Category',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'changePassword',
    component: ChangepasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
