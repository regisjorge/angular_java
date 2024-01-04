import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'courses'},
  {path:"courses", loadChildren: () => import('./curses/curses.module').then(m => m.CursesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
