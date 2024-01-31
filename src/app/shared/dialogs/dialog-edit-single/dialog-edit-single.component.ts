import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormService } from '../../services/form/form.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListData } from '../../interfaces/list-data';

@Component({
  selector: 'app-dialog-edit-single',
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
  templateUrl: './dialog-edit-single.component.html',
  styleUrl: './dialog-edit-single.component.scss'
})
export class DialogEditSingle {
  loading = false;
  allowAddBtn = false;
  value = '';
  id = '';
  element= '';
  form = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s-]*$'),
    Validators.minLength(2)
  ]);

  
  constructor(
    public dialogRef: MatDialogRef<DialogEditSingle>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseServices: FirebaseService,
    public formService: FormService,
  ) {
    if (data.from) this.form = data.from;
    if (data.value && data.id) {
      this.element = data.element;
      this.value = data.value;
      this.id = data.id;
    } 
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


  async saveElement() {
    if (this.id === '') return
    this.loading = true;
    let object = this.getObject();
    this.form.disable();
    this.allowAddBtn = false;
    await this.firebaseServices.updateListData(this.element ,this.id, object);
    this.dialogRef.close(object);
  }
}
