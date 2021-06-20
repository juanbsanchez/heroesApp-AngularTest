import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {Error404Component} from "./shared/error404/error404.component";

const routes: Routes = [
  {
    path: '404',
    component: Error404Component
  },

  /** otherwise redirect to 404 error page**/
  {
    path: '**',
    redirectTo: '404'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
