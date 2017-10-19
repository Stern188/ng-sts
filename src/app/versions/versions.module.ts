import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PageModule } from "../page/page.module";
import { MaterialModule, MdNativeDateModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormsBootstrapUIModule } from "../dynamic-forms/ui-bootstrap/ui-bootstrap.module";
import { TopCommonModule } from "../common/topcommon.module";
import { ToasterModule } from 'angular2-toaster';
import { VersionsRoutingModule } from "./versions-routing.module";
import { VersionsComponent } from './versions.component';

export let VersionsModuleAddMenu = (navbar) => {
    navbar.add_menu({
        id: 'VERSIONS', submenu: [
            {
                id: 'versions', name: '版本管理', icon: 'input', link: '/versions/versions'
            }
        ]
    });
};
@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        VersionsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsBootstrapUIModule,
        PageModule,
        FlexLayoutModule,
        TopCommonModule,
        MaterialModule,
        MdNativeDateModule,
        ToasterModule
    ],
    declarations: [VersionsComponent],
    providers: []
})

export class VersionsModule { }
