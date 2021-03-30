import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NCellComponent } from './n-cell.component';

describe('NCellComponent', () => {
  let component: NCellComponent;
  let fixture: ComponentFixture<NCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
