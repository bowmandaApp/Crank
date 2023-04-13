import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputingMachineComponent } from './computing-machine.component';

describe('ComputingMachineComponent', () => {
  let component: ComputingMachineComponent;
  let fixture: ComponentFixture<ComputingMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputingMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
