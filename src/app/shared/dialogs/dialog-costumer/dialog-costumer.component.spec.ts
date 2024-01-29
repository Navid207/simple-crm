import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCostumerComponent } from './dialog-costumer.component';

describe('DialogAddUserComponent', () => {
  let component: DialogCostumerComponent;
  let fixture: ComponentFixture<DialogCostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCostumerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
