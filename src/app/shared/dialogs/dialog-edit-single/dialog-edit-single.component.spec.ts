import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSingle } from './dialog-edit-single.component';

describe('DialogSectionComponent', () => {
  let component: DialogEditSingle;
  let fixture: ComponentFixture<DialogEditSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditSingle]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditSingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
