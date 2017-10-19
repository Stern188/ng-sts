/**
 * Created by conan on 7/17/2017.
 */


import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { IndexComponent } from "./index.component";


const routes: Routes = [
    { path: 'index', component: IndexComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndexRoutingModule {

}
