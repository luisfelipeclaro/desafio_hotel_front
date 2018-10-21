import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospedesComponent } from './hospedes/hospedes.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'hospedes',
    component: HospedesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
