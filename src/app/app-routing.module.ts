import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TableComponent} from './table/table.component';
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
