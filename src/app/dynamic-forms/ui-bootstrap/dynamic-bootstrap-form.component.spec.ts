import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBootstrapFormComponent } from './dynamic-bootstrap-form.component';

describe('DynamicBootstrapFormComponent', () => {
  let component: DynamicBootstrapFormComponent;
  let fixture: ComponentFixture<DynamicBootstrapFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBootstrapFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBootstrapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
