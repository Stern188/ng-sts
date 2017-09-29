/**
 * Created by conan on 7/17/2017.
 */


import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MembersComponent } from "./members.component";


const routes: Routes = [
    { path: 'members', component: MembersComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembersRoutingModule {

}
