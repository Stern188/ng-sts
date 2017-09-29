/**
 * Created by conan on 2017/6/10.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./login/auth-guard.service";
import { AppComponent } from "./app.component";
const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'members', loadChildren: 'app/members/members.module#MembersModule' },
  { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
