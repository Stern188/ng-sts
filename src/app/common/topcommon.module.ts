import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsPipe } from './items.pipe';
import { SelectizeComponent } from './selectize/selectize.component';
import { Select2Component } from './select2/select2.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { NouisliderComponent } from './nouislider/nouislider.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports:[
    ItemsPipe,
    SelectizeComponent,
    Select2Component,
    NouisliderComponent
  ],
  declarations: [ ItemsPipe, SelectizeComponent, Select2Component, NouisliderComponent]
})
export class TopCommonModule { }
