import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NBuildingComponent } from './n-building.component';

describe('NBuildingComponent', () => {
  let component: NBuildingComponent;
  let fixture: ComponentFixture<NBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
