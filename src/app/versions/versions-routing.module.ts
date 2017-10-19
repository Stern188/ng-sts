/**
 * Created by conan on 7/17/2017.
 */


import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { VersionsComponent } from "./versions.component";


const routes: Routes = [
    { path: 'versions', component: VersionsComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VersionsRoutingModule {

}
