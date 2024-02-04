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
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    FormSelectorComponent
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
    public formService: FormService
  ) {
    if (!data.settings) this.setNewUser();
    else this.setUserInfos(data.userdata, data.settings);
  }


  setNewUser() {
    this.dialogTitle = 'Add new User';
    this.newUser = true;
    this.userInfoGeneral = true;
    this.userInfoAddress = true;
    this.resetInputs();
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
    this.formData.firstName.setValue(data.firstName);
    this.formData.lastName.setValue(data.lastName);
    this.formData.mail.setValue(data.mail);
    this.formData.department.setValue(data.department);
    if (data.phone) this.formData.phone.setValue(data.phone.toString());
    if (data.birthDate) this.setBirthday(data.birthDate);
  }


  setBirthday(bDay: number){
    const date = new Date(bDay).toISOString();
    this.formData.birthDate = new FormControl(date)
  }


  onFormValueChange(value: string) {
    this.formData.department.setValue(value);
    this.enableAddUser();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  async addUser() {
    this.setUserData();
    this.setLoading();
    await this.userServices.addNewElement('users', this.data);
    this.resetInputs();
    this.enableInputs();
    this.dialogRef.close();
  }


  async saveUserData() {
    this.setUserData();
    this.setLoading();
    await this.userServices.updateUserData(this.data);
    this.resetInputs();    
    this.enableInputs();
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
    this.formData.birthDate.disable();
    this.formData.department.disable();
    this.formData.mail.disable();
    this.formData.phone.disable();
  }


  enableInputs() {
    this.formData.firstName.enable();
    this.formData.lastName.enable();
    this.formData.birthDate.enable();
    this.formData.department.enable();
    this.formData.mail.enable();
    this.formData.phone.enable();
  }


  setUserData() {
    this.data.firstName = this.formService.getFormData(this.formData.firstName);
    this.data.lastName = this.formService.getFormData(this.formData.lastName);
    this.data.department = this.formService.getFormData(this.formData.department);
    this.data.mail = this.formService.getFormData(this.formData.mail);
    this.data.birthDate = this.formService.getTimeFromDate(this.formService.getFormData(this.formData.birthDate));
    this.data.phone = parseInt(this.formService.getFormData(this.formData.phone));
  }


  resetInputs() {
    this.formData.firstName.reset();
    this.formData.lastName.reset();
    this.formData.department.reset();
    this.formData.birthDate.reset();
    this.formData.mail.reset();
    this.formData.phone.reset();
  }


  enableAddUser() {
    this.allowAddBtn = false;
    if (!this.formData.firstName.valid) return
    if (!this.formData.lastName.valid) return
    if (!this.formData.mail.valid) return
    if (this.formData.department.value =='') return
    else this.allowAddBtn = true;
  }

}
