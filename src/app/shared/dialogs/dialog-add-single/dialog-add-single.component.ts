import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormService } from '../../services/form/form.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-single',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './dialog-add-single.component.html',
  styleUrl: './dialog-add-single.component.scss'
})
export class DialogAddSingle {
  loading = false;
  allowAddBtn = false;
  element!: string;
  form = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
    Validators.minLength(2)
  ]);

  constructor(
    public dialogRef: MatDialogRef<DialogAddSingle>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseServices: FirebaseService,
    public formService: FormService,
  ) {
    if (data.from) this.form = data.from;
    if (data.element) this.element = data.element
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  enableAddElement() {
    this.allowAddBtn = false;
    if (this.form.valid) this.allowAddBtn = true;
  }


  getObject() {
    let value = this.formService.getFormData(this.form);
    return {
      name: value
    }
  }


  async addElement() {
    this.loading = true;
    let object = this.getObject();
    this.form.disable();
    let id
    this.allowAddBtn = false;
    id = await this.firebaseServices.addNewElement(this.element, object );
    this.dialogRef.close(id);
  }
}
