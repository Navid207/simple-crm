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
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';


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
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss'
})
export class DialogUserComponent {
  newUser = false;
  loading = false;
  allowAddBtn = false;
  userInfoGeneral = false;
  userInfoAddress = false;
  dialogTitle = '';
  id?: string;
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


  constructor(
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private userServices: FirebaseService
  ) {
    if (!data.settings) this.setNewUser();
    else this.setUserInfos(data.userdata, data.settings);
  }

  setNewUser() {
    this.dialogTitle = 'Add new User';
    this.newUser = true;
    this.userInfoGeneral = true;
    this.userInfoAddress = true;
  }


  setUserInfos(userdatas:UserData, settings: 'general' | 'address') {
    this.data = userdatas;
    this.setFormDataValues(userdatas);
    if (settings === 'general'){
      this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName;
      this.userInfoGeneral = true; 
    } 
    else {
      this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName + ' ' +'Address';
      this.userInfoAddress = true;
    }
  }


  setFormDataValues(data: UserData) {
    this.id = data.id;
    this.formData.firstName.setValue(data.firstName);
    this.formData.lastName.setValue(data.lastName);
    this.formData.street.setValue(data.street);
    this.formData.zipCode.setValue(data.zipCode.toString());
    this.formData.city.setValue(data.city);
    this.formData.mail.setValue(data.mail);
    if (data.phone) this.formData.phone.setValue(data.phone.toString());
    if (data.birthDate) {
      let date: Date = new Date(data.birthDate);
      this.formData.birthDate.setValue(date.toString());
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  getErrorMessage(varForm: FormControl, msgLabel: string) {
    if (varForm.hasError('required')) return msgLabel + ' is required';
    if (varForm.hasError('pattern') || varForm.hasError('minlength')) return (msgLabel + ' not valid');
    return ''
  }


  async addUser() {
    this.setUserData();
    this.setLoading();
    await this.userServices.addNewUser(this.data);
    this.resetInputs();
    this.dialogRef.close();
  }


  async saveUserData() {
    this.setUserData();
    this.setLoading();
    await this.userServices.updateUserData(this.data);
    this.resetInputs();
    this.dialogRef.close();
  }


  setLoading() {
    this.disableInputs();
    this.allowAddBtn = false;
    this.loading = true;
  }


  disableInputs() {
    this.formData.firstName.disable();
    this.formData.lastName.disable();
    this.formData.street.disable();
    this.formData.zipCode.disable();
    this.formData.city.disable();
    this.formData.birthDate.disable();
    this.formData.mail.disable();
    this.formData.phone.disable();
  }


  setUserData() {
    this.data.firstName = this.getFormData(this.formData.firstName);
    this.data.lastName = this.getFormData(this.formData.lastName);
    this.data.street = this.getFormData(this.formData.street);
    this.data.zipCode = parseInt(this.getFormData(this.formData.zipCode));
    this.data.city = this.getFormData(this.formData.city);
    this.data.mail = this.getFormData(this.formData.mail);
    this.data.birthDate = this.getTimeFromDate(this.getFormData(this.formData.birthDate));
    this.data.phone = parseInt(this.getFormData(this.formData.phone));
  }


  resetInputs() {
    this.formData.firstName.reset();
    this.formData.lastName.reset();
    this.formData.street.reset();
    this.formData.zipCode.reset();
    this.formData.city.reset();
    this.formData.birthDate.reset();
    this.formData.mail.reset();
    this.formData.phone.reset();
  }


  getTimeFromDate(date: Date): number | undefined {
    if (date) return date.getTime();
    else return NaN
  }


  getFormData(FormData: FormControl) {
    if (FormData.status == 'VALID' && FormData.value) return FormData.value;
    else return NaN
  }


  enableAddUser() {
    if (!this.formData.firstName.valid) return
    if (!this.formData.lastName.valid) return
    if (!this.formData.street.valid) return
    if (!this.formData.zipCode.valid) return
    if (!this.formData.city.valid) return
    if (!this.formData.mail.valid) return
    else this.allowAddBtn = true;
  }
}
