import { Component, Inject } from '@angular/core';
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
import { CompanyData } from '../../interfaces/company-data';
import { ContactData } from '../../interfaces/contact-data';
import { concat } from 'rxjs';


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
    private FBServices: FirebaseService,
    public formService: FormService
  ) {
    if (!data.settings) this.setNewUser();
    else this.setData(data.companyData, data.settings, data.index);
  }


  setNewUser() {
    this.dialogTitle = 'Add new Contact';
    this.newUser = true;
  }


  setData(datas: CompanyData, settings: 'new' | 'change', index: number | null) {
    if (settings === 'new') {
      this.dialogTitle = 'Add new Contact';
    }
    if (settings === 'change' && index !== null ) {
      this.dialogTitle = datas.contacts[index].firstName + ' ' + datas.contacts[index].lastName;
      this.setFormDataValues(datas.contacts[index]);
    }
    // this.data = datas;
    // this.id = data.id;
  }


  setFormDataValues(data: ContactData) {
    this.formData.firstName.setValue(data.firstName);
    this.formData.lastName.setValue(data.lastName);
    this.formData.department.setValue(data.department)
    this.formData.mail.setValue(data.mail);
    this.formData.phone.setValue(data.phone.toString());
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }


  addContact() {
    this.setContactData()
    this.resetInputs();
    this.dialogRef.close(this.data);
  }


  async saveContact() {
    this.setContactData();
    this.setLoading();
    await this.FBServices.updateCopmanyData(this.data.companyData);
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
    this.formData.department.disable();
    this.formData.mail.disable();
    this.formData.phone.disable();
  }


  enableInputs() {
    this.formData.firstName.enable();
    this.formData.lastName.enable();
    this.formData.department.enable();
    this.formData.mail.enable();
    this.formData.phone.enable();
  }


  onFormValueChange(value: string) {
    this.formData.department.setValue(value);
    this.enableAddBtn();
  }


  setContactData() {
    if (this.data.index != null) this.changeContact(this.data.index)
    else this.pushContact();
  }

  changeContact(i: number){
    this.data.companyData.contacts[i].firstName = this.formService.getFormData(this.formData.firstName);
    this.data.companyData.contacts[i].lastName = this.formService.getFormData(this.formData.lastName);
    this.data.companyData.contacts[i].department = this.formService.getFormData(this.formData.department);
    this.data.companyData.contacts[i].mail = this.formService.getFormData(this.formData.mail);
    this.data.companyData.contacts[i].phone = parseInt(this.formService.getFormData(this.formData.phone));
  }

  pushContact(){
    let contact: ContactData = {
      firstName : this.formService.getFormData(this.formData.firstName),
      lastName : this.formService.getFormData(this.formData.lastName),
      department : this.formService.getFormData(this.formData.department),
      mail : this.formService.getFormData(this.formData.mail),
      phone : parseInt(this.formService.getFormData(this.formData.phone)),  
    }
    this.data.companyData.contacts.push(contact);
  }


  resetInputs() {
    this.formData.firstName.reset();
    this.formData.lastName.reset();
    this.formData.department.reset();
    this.formData.mail.reset();
    this.formData.phone.reset();
  }


  enableAddBtn() {
    this.allowAddBtn = false;
    if (!this.formData.firstName.valid) return
    if (!this.formData.lastName.valid) return
    if (!this.formData.department.valid) return
    if (!this.formData.mail.valid) return
    if (!this.formData.phone.valid && this.formData.phone.value != '') return
    else this.allowAddBtn = true;
  }


}
