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
import { FormService } from '../../services/form/form.service';
import { FormSelectorComponent } from '../../components/form-selector/form-selector.component';


@Component({
  selector: 'app-dialog-add-cosumer',
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
    FormSelectorComponent
  ],
  templateUrl: './dialog-costumer.component.html',
  styleUrl: './dialog-costumer.component.scss'
})
export class DialogCostumerComponent {
  newUser = false;
  loading = false;
  allowAddBtn = false;
  dialogTitle = '';
  id?: string;
  formData = this.formService.formContact;


  constructor(
    public dialogRef: MatDialogRef<DialogCostumerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userServices: FirebaseService,
    public formService: FormService
  ) {
    if (!data.settings) this.setNewUser();
    // else this.setUserInfos(data.userdata, data.settings);
    // this.formData.city.disable();
  }


  setNewUser() {
    this.dialogTitle = 'Add new Contact';
    this.newUser = true;
  }


  // setUserInfos(userdatas: UserData, settings: 'general' | 'address' | 'all') {
  //   this.data = userdatas;
  //   this.setFormDataValues(userdatas);
  //   if (settings === 'general') {
  //     this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName;
  //     this.userInfoGeneral = true;
  //   }
  //   if (settings === 'address') {
  //     this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName + ' ' + 'Address';
  //     this.userInfoAddress = true;
  //   }
  //   if (settings === 'all') {
  //     this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName;
  //     this.userInfoAddress = true;
  //     this.userInfoGeneral = true;
  //   }
  // }


  // setFormDataValues(data: UserData) {
  //   this.id = data.id;
  //   this.formData.firstName.setValue(data.firstName);
  //   this.formData.lastName.setValue(data.lastName);
  //   this.formData.mail.setValue(data.mail);
  //   if (data.phone) this.formData.phone.setValue(data.phone.toString());
  //   if (data.birthDate) {
  //     let date: Date = new Date(data.birthDate);
  //     this.formData.birthDate.setValue(date.toString());
  //   }
  // }


  onNoClick(): void {
    this.dialogRef.close();
  }


  addContact() {
    debugger
    this.setUserData()
    // this.setUserData();
    // this.setLoading();
    // await this.userServices.addNewElement('users', this.data);
    // this.resetInputs();
    // this.dialogRef.close();
  }


  async saveUserData() {
    // this.setUserData();
    // this.setLoading();
    // await this.userServices.updateUserData(this.data);
    // this.resetInputs();
    // this.dialogRef.close();
  }


  setLoading() {
    this.disableInputs();
    this.allowAddBtn = false;
    this.loading = true;
  }


  disableInputs() {
    this.formData.firstName.disable();
    this.formData.lastName.disable();
    this.formData.mail.disable();
    this.formData.phone.disable();
  }

  onFormValueChange(value: string) {
    this.formData.department.setValue(value);
    this.enableAddUser();
  }

  setUserData() {
    this.data.firstName = this.formService.getFormData(this.formData.firstName);
    this.data.lastName = this.formService.getFormData(this.formData.lastName);
    this.data.lastName = this.formService.getFormData(this.formData.department);
    this.data.mail = this.formService.getFormData(this.formData.mail);
    this.data.phone = parseInt(this.formService.getFormData(this.formData.phone));
  }


  resetInputs() {
    this.formData.firstName.reset();
    this.formData.lastName.reset();
    this.formData.mail.reset();
    this.formData.phone.reset();
  }


  enableAddUser() {
    this.allowAddBtn = false;
    if (!this.formData.firstName.valid) return
    if (!this.formData.lastName.valid) return
    if (!this.formData.department.valid) return
    if (!this.formData.mail.valid) return
    else this.allowAddBtn = true;
  }


}
