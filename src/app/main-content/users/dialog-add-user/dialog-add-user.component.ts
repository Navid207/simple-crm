import { Component, Inject } from '@angular/core';
import { UserData } from '../../../shared/interfaces/user-data';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDialogClose
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }


  firstName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z][a-zA-Z\s]*$'),
    Validators.minLength(2)
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z][a-zA-Z\s]*$'),
    Validators.minLength(2)
  ]);
  street = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z][a-zA-Z0-9\s]*$'),
    Validators.minLength(3)
  ]);
  zipCode = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
    Validators.minLength(2)
  ]);
  city = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z][a-zA-Z\s]*$'),
    Validators.minLength(3)
  ]);
  birthDate = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z][a-zA-Z\s]*$'),
    Validators.minLength(2)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
    Validators.minLength(5)
  ]);


  getErrorMessage(varForm: FormControl, msgLabel: string) {
    if (varForm.hasError('required')) return msgLabel + ' is required';
    if (varForm.hasError('pattern') || varForm.hasError('minlength')) return (msgLabel + ' not valid');
    return ''
  }


  setUserData() {
    this.data.firstName =  this.getFormData(this.firstName);
    this.data.lastName =  this.getFormData(this.lastName);
    this.data.street =  this.getFormData(this.street);
    this.data.zipCode =  this.getFormData(this.zipCode);
    this.data.city =  this.getFormData(this.city);
    this.data.birthDate =  this.getFormData(this.birthDate);
    this.data.mail =  this.getFormData(this.email);
    this.data.phone =  this.getFormData(this.phone);
    debugger
  }


  getFormData(FormData: FormControl){
    if (FormData.status == 'VALID' && FormData.value) return FormData.value;
    else return null
  }
 
}
