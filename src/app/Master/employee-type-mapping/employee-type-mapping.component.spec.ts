import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypeMappingComponent } from './employee-type-mapping.component';

describe('EmployeeTypeMappingComponent', () => {
  let component: EmployeeTypeMappingComponent;
  let fixture: ComponentFixture<EmployeeTypeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTypeMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTypeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
