import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotasGridComponent } from './cuotas-grid.component';

describe('CuotasGridComponent', () => {
  let component: CuotasGridComponent;
  let fixture: ComponentFixture<CuotasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotasGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
