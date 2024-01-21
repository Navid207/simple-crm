import { Component, Inject, ViewChild } from '@angular/core';
import { UserData } from '../../../shared/interfaces/user-data';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirebaseService } from '../../../shared/services/firebase.service';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private userServices: FirebaseService
  ) { }

  @ViewChild('addUser') addUserBtn!: MatButton;

  onNoClick(): void {
    this.dialogRef.close();
  }


  formData = {
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(2)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(2)
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s\\-\'",.!?]+[0-9]*$'),
      Validators.minLength(3)
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(2)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(3)
    ]),
    birthDate: new FormControl('', [
      Validators.pattern(/^[A-Za-z]{3} [A-Za-z]{3} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(.+\)$/i),
      Validators.minLength(2)
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    phone: new FormControl('', [
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(5)
    ]),
  }


  getErrorMessage(varForm: FormControl, msgLabel: string) {
    if (varForm.hasError('required')) return msgLabel + ' is required';
    if (varForm.hasError('pattern') || varForm.hasError('minlength')) return (msgLabel + ' not valid');
    return ''
  }


  setUserData() {
    this.data.firstName = this.getFormData(this.formData.firstName);
    this.data.lastName = this.getFormData(this.formData.lastName);
    this.data.street = this.getFormData(this.formData.street);
    this.data.zipCode = parseInt(this.getFormData(this.formData.zipCode));
    this.data.city = this.getFormData(this.formData.city);
    this.data.birthDate = this.getTimeFromDate(this.getFormData(this.formData.birthDate));
    this.data.mail = this.getFormData(this.formData.mail);
    this.data.phone = parseInt(this.getFormData(this.formData.phone));
    console.log(this.data, JSON.stringify(this.data));
    debugger
    // this.userServices.addNewUser(JSON.stringify(this.data));
    this.userServices.addNewUser(this.data);
  }


  getTimeFromDate(date: Date) :number | undefined{
    if (date) return date.getTime();
    else return undefined
  }


  getFormData(FormData: FormControl) {
    if (FormData.status == 'VALID' && FormData.value) return FormData.value;
    else return null
  }


  enableAddUser() {
    if (!this.formData.firstName.valid) return
    if (!this.formData.lastName.valid) return
    if (!this.formData.street.valid) return
    if (!this.formData.zipCode.valid) return
    if (!this.formData.city.valid) return
    if (!this.formData.mail.valid) return
    else this.addUserBtn.disabled = false;
  }


  // UserDatatoJSON():JSON {
  //   return {
  //     id: this.data.id,
  //     firstName: this.data.firstName,
  //     lastName: this.data.lastName,
  //     street: this.data.street,
  //     zipCode: this.data.zipCode,
  //     city: this.data.city,
  //     mail: this.data.mail,
  //     phone: this.data.phone,
  //     birthDate: this.data.birthDate,
  //   }
  // }
}
