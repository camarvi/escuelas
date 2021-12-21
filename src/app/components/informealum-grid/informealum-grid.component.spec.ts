import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformealumGridComponent } from './informealum-grid.component';

describe('InformealumGridComponent', () => {
  let component: InformealumGridComponent;
  let fixture: ComponentFixture<InformealumGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformealumGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformealumGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
