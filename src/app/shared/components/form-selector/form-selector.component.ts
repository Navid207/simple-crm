import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddSingle } from '../../dialogs/dialog-add-single/dialog-add-single.component';
import { Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-form-selector',
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-selector.component.html',
  styleUrl: './form-selector.component.scss'
})
export class FormSelectorComponent implements OnInit, OnChanges {

  @Input() form!: 'sector' | 'department';
  @Input() disable = false;
  @Output() valueOut = new EventEmitter<string>();

  unsubElement!: Unsubscribe;
  selectableSectors: string[] = [];
  formData = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  constructor(
    private FBservices: FirebaseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (this.form === 'sector') this.unsubElement = this.FBservices.subSectors();
    else this.unsubElement = this.FBservices.subDepartments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (!this.disable) this.formData.enable();
      else  this.formData.disable();
    }
  }

  setValue(){
    if (this.formData.value) this.valueOut.emit(this.formData.value);
  }

  ngOnDestroy() {
    this.unsubElement();
  }

  getElements(): string[] {
    if (this.form === 'sector') return this.FBservices.sectors;
    else return this.FBservices.departments;
  }

  openDialogAddElement(): void {
    const form = this.formData;
    const element = this.form;
    let id = ''
    const dialogRef = this.dialog.open
      (DialogAddSingle, { data: { form, element, id } });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      if (result.name && result.name.length >= 2) {
        this.formData.setValue(result.name)
      }
    });
  }
}
