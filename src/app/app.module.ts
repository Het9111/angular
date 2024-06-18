import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLineModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './Category/category/category.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CategoryViewComponent } from './Category/category-view/category-view.component';
import { CategoryCreateComponent } from './Category/category-create/category-create.component';
import { CategoryUpdateComponent } from './Category/category-update/category-update.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarComponent,
    MatLineModule,
    DashboardComponent,
    CategoryComponent,
    MatGridListModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    CategoryViewComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
