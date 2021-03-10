import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanReadyComponent } from './scan-ready.component';

describe('ScanReadyComponent', () => {
  let component: ScanReadyComponent;
  let fixture: ComponentFixture<ScanReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
