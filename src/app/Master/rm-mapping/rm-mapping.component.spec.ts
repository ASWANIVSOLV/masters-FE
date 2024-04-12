import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmMappingComponent } from './rm-mapping.component';

describe('RmMappingComponent', () => {
  let component: RmMappingComponent;
  let fixture: ComponentFixture<RmMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RmMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
