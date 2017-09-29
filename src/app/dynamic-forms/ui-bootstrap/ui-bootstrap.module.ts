import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';
import {TopCommonModule} from '../../common/topcommon.module';
import {NouisliderModule} from 'ng2-nouislider';
import { DynamicBootstrapFormComponent } from './dynamic-bootstrap-form.component';
import { DynamicBootstrapFormControlComponent } from './dynamic-bootstrap-form-control.component';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    DynamicFormsCoreModule,
    TopCommonModule
  ],
  declarations: [
    DynamicBootstrapFormComponent,
    DynamicBootstrapFormControlComponent
  ],
  exports: [
    DynamicFormsCoreModule,
    DynamicBootstrapFormComponent,
    DynamicBootstrapFormControlComponent
  ]
})

export class DynamicFormsBootstrapUIModule {
}
