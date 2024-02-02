import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserselectionComponent } from './dialog-userselection.component';

describe('DialogAddUserComponent', () => {
  let component: DialogUserselectionComponent;
  let fixture: ComponentFixture<DialogUserselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUserselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUserselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
