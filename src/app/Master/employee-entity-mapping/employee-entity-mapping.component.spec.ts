import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEntityMappingComponent } from './employee-entity-mapping.component';

describe('EmployeeEntityMappingComponent', () => {
  let component: EmployeeEntityMappingComponent;
  let fixture: ComponentFixture<EmployeeEntityMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEntityMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeEntityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
