import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSingle } from './dialog-add-single.component';

describe('DialogSectionComponent', () => {
  let component: DialogAddSingle;
  let fixture: ComponentFixture<DialogAddSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddSingle]
    })
    .compileComponents();
    #
    fixture = TestBed.createComponent(DialogAddSingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
