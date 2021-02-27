import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DataTablesModule} from 'angular-datatables';
import { GenerateQrComponent } from './generate-qr.component';

describe('GenerateQrComponent', () => {
  let component: GenerateQrComponent;
  let fixture: ComponentFixture<GenerateQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateQrComponent ], imports: [DataTablesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
