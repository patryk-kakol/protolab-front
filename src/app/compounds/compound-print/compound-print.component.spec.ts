import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundPrintComponent } from './compound-print.component';

describe('CompoundPrintComponent', () => {
  let component: CompoundPrintComponent;
  let fixture: ComponentFixture<CompoundPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
