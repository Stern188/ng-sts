/**
 * Created by conan on 7/17/2017.
 */


import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./projects.component";


const routes: Routes = [
    { path: 'projects', component: ProjectsComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {

}
