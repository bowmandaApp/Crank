import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScamazonComponent } from './scamazon.component';

describe('ScamazonComponent', () => {
  let component: ScamazonComponent;
  let fixture: ComponentFixture<ScamazonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScamazonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScamazonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
