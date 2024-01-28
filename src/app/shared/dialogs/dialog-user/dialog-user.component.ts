import { Component, Inject, ViewChild } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ZipCodeService } from '../../services/zip-code/zip-code.service';
import { FormService } from '../../services/form/form.service';


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
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
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
  selectableCitys: string[] = [];
  serchZipCode!: number;
  id?: string;
  formData = this.formService.formUser;


  constructor(
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userServices: FirebaseService,
    private zipCodeService: ZipCodeService,
    public formService: FormService
  ) {
    if (!data.settings) this.setNewUser();
    else this.setUserInfos(data.userdata, data.settings);
    this.formData.city.disable();
  }


  setNewUser() {
    this.dialogTitle = 'Add new User';
    this.newUser = true;
    this.userInfoGeneral = true;
    this.userInfoAddress = true;
  }


  setUserInfos(userdatas: UserData, settings: 'general' | 'address' | 'all') {
    this.data = userdatas;
    this.setFormDataValues(userdatas);
    if (settings === 'general') {
      this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName;
      this.userInfoGeneral = true;
    }
    if (settings === 'address') {
      this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName + ' ' + 'Address';
      this.userInfoAddress = true;
    }
    if (settings === 'all') {
      this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName;
      this.userInfoAddress = true;
      this.userInfoGeneral = true;
    }
  }


  setFormDataValues(data: UserData) {
    this.id = data.id;
    this.serchZipCode = data.zipCode;
    this.selectableCitys.push(data.city);
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


  async addUser() {
    this.setUserData();
    this.setLoading();
    await this.userServices.addNewElement('users', this.data);
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
    this.data.firstName = this.formService.getFormData(this.formData.firstName);
    this.data.lastName = this.formService.getFormData(this.formData.lastName);
    this.data.street = this.formService.getFormData(this.formData.street);
    this.data.zipCode = parseInt(this.formService.getFormData(this.formData.zipCode));
    this.data.city = this.formService.getFormData(this.formData.city);
    this.data.mail = this.formService.getFormData(this.formData.mail);
    this.data.birthDate = this.formService.getTimeFromDate(this.formService.getFormData(this.formData.birthDate));
    this.data.phone = parseInt(this.formService.getFormData(this.formData.phone));
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


  enableAddUser() {
    this.allowAddBtn = false;
    if (!this.formData.firstName.valid) return
    if (!this.formData.lastName.valid) return
    if (!this.formData.street.valid) return
    if (!this.formData.zipCode.valid) return
    if (this.formData.city.value === null) return
    if (!this.formData.mail.valid) return
    else this.allowAddBtn = true;
  }


  checkZipCode() {
    if (this.formData.zipCode.status === 'VALID') {
      let zip: number = parseInt(this.formService.getFormData(this.formData.zipCode));
      this.formData.city.enable();
      if (zip != this.serchZipCode) this.fillSelectableCitys(zip);
    }
    else {
      this.formData.city.disable();
      return
    }
  }


  fillSelectableCitys(zip: number) {
    this.formData.city.reset();
    this.serchZipCode = zip;
    this.zipCodeService.getArrayOfCitys(this.serchZipCode)
      .then((result: string[]) => {
        this.selectableCitys = result;
      })
      .catch((error) => {
        console.error('Error by filling the selectable Citys:', error);
      });
  }

  resteCitySelection() {
    this.formData.city.reset();
    this.enableAddUser();
  }

}
