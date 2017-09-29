import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  DynamicFormValidationService,
  DynamicFormControlModel,
  DynamicFormArrayGroupModel,
  DynamicFormControlComponent,
  DynamicFormControlEvent,
  DynamicTemplateDirective,
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_INPUT,
  DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_SELECT,
  DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DYNAMIC_FORM_CONTROL_TYPE_SWITCH, DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_SLIDER
} from '@ng2-dynamic-forms/core';

export const enum BootstrapFormControlType {

  Array = 1, //"ARRAY",
  Checkbox = 2, //"CHECKBOX",
  Group = 3, //"GROUP",
  Input = 4, //"INPUT",
  RadioGroup = 5, //"RADIO_GROUP",
  Select = 6, //"SELECT",
  TextArea = 7, //"TEXTAREA"
  Switch = 8, //"SWITCH"
  Datetime = 9,
  Slider = 10
}

@Component({

  moduleId: module.id,
  selector: 'dynamic-bootstrap-form-control',
  templateUrl: './dynamic-bootstrap-form-control.component.html',
  styleUrls: ['./dynamic-bootstrap-form-control.component.scss']
})
export class DynamicBootstrapFormControlComponent extends DynamicFormControlComponent implements OnChanges, OnInit {

  public readonly formContrlCls = 'form-control ';
  @Input() enableLabel: boolean = false;
  @Input() formHorizontal: boolean = false;
  @Input() labelFloating: boolean = true;
  @Input() labelCheck: boolean = false;

  @Input() asBootstrapFormGroup: boolean = true;
  @Input() bindId: boolean = true;
  @Input() context: DynamicFormArrayGroupModel = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() model: DynamicFormControlModel;
  @Input("templates") inputTemplates: QueryList<DynamicTemplateDirective>;

  @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

  @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;

  type: BootstrapFormControlType | null;

  constructor(protected changeDetectorRef: ChangeDetectorRef, protected validationService: DynamicFormValidationService) {
    super(changeDetectorRef, validationService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.formHorizontal) {
      this.enableLabel = true;
      this.labelFloating = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes["model"]) {
      this.type = DynamicBootstrapFormControlComponent.getFormControlType(this.model);
    }
  }

  disableControl(val: boolean) {
    this.model.disabledUpdates.next(val);
  }

  static getFormControlType(model: DynamicFormControlModel): BootstrapFormControlType | null {

    switch (model.type) {

      case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
        return BootstrapFormControlType.Array;

      case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
        return BootstrapFormControlType.Checkbox;

      case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
      case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
        return BootstrapFormControlType.Group;

      case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
        return BootstrapFormControlType.Input;

      case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
        return BootstrapFormControlType.RadioGroup;

      case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
        return BootstrapFormControlType.Select;

      case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
        return BootstrapFormControlType.TextArea;

      case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
        return BootstrapFormControlType.Switch;
      case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
        return BootstrapFormControlType.Datetime;
      case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
        return BootstrapFormControlType.Slider;


      default:
        return null;
    }
  }
}
