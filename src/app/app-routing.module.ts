import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'game', component:AppComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: '', redirectTo:'/dashboard', pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
