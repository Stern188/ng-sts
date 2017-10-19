/**
 * Created by conan on 2017/6/10.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./login/auth-guard.service";
import { AppComponent } from "./app.component";
const routes: Routes = [
  { path: '', redirectTo: '/index/index', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'index', loadChildren: 'app/index/index.module#IndexModule' },
  { path: 'members', loadChildren: 'app/members/members.module#MembersModule' },
  { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule' },
  { path: 'versions', loadChildren: 'app/versions/versions.module#VersionsModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
