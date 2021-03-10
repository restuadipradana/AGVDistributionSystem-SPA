import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanAgvComponent } from './scan-agv.component';

describe('ScanAgvComponent', () => {
  let component: ScanAgvComponent;
  let fixture: ComponentFixture<ScanAgvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanAgvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanAgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
