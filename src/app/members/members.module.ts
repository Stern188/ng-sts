import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PageModule } from "../page/page.module";
import { MaterialModule, MdNativeDateModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormsBootstrapUIModule } from "../dynamic-forms/ui-bootstrap/ui-bootstrap.module";
import { TopCommonModule } from "../common/topcommon.module";
import { MembersRoutingModule } from "./members-routing.module";
import { MembersComponent } from './members.component';

export let MembersModuleAddMenu = (navbar) => {
    navbar.add_menu({
        id: 'MEMBERS', submenu: [
            {
                id: 'members', name: '用户管理', icon: 'input', link: '/members/members'
            }
        ]
    });
};
@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        MembersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsBootstrapUIModule,
        PageModule,
        FlexLayoutModule,
        TopCommonModule,
        MaterialModule,
        MdNativeDateModule
    ],
    declarations: [MembersComponent],
    providers: []
})

export class MembersModule { }
