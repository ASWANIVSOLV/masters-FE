import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsccMappingComponent } from './bscc-mapping.component';

describe('BsccMappingComponent', () => {
  let component: BsccMappingComponent;
  let fixture: ComponentFixture<BsccMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BsccMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BsccMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
