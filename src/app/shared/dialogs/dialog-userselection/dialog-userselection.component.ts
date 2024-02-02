import { Component, Inject, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { FormService } from '../../services/form/form.service';
import { ContactData } from '../../interfaces/contact-data';
import { UsersSelectionListComponent } from '../../components/users-selection-list/users-selection-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dialog-userselection',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    UsersSelectionListComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatProgressBarModule,
    ],
  templateUrl: './dialog-userselection.component.html',
  styleUrl: './dialog-userselection.component.scss'
})
export class DialogUserselectionComponent implements OnChanges {
  newUser = false;
  loading = false;
  allowAddBtn = false;
  dialogTitle = '';
  id?: string;
  assignedList = [];

  @ViewChild('userlist') userList!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUserselectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FBServices: FirebaseService,
    public formService: FormService
  ) {
    if (data.companyData.assigned) this.assignedList = data.companyData.assigned;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.userList.selectedUserIds.length !== this.assignedList.length) {
        this.allowAddBtn = true;
        debugger
      }
      else  this.allowAddBtn = false;
    }
  }

  test(){
    debugger
  }


  // setNewUser() {
  //   this.dialogTitle = 'Add new Contact';
  //   this.newUser = true;
  // }


  // setData(datas: CompanyData, settings: 'new' | 'change', index: number | null) {
  //   if (settings === 'new') {
  //     this.dialogTitle = 'Add new Contact';
  //   }
  //   if (settings === 'change' && index !== null ) {
  //     this.dialogTitle = datas.contacts[index].firstName + ' ' + datas.contacts[index].lastName;
  //     this.setFormDataValues(datas.contacts[index]);
  //   }
  //   // this.data = datas;
  //   // this.id = data.id;
  // }


  // setFormDataValues(data: ContactData) {
  //   this.formData.firstName.setValue(data.firstName);
  //   this.formData.lastName.setValue(data.lastName);
  //   this.formData.department.setValue(data.department)
  //   this.formData.mail.setValue(data.mail);
  //   this.formData.phone.setValue(data.phone.toString());
  // }

  
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }


  // addContact() {
  //   this.setContactData()
  //   this.resetInputs();
  //   this.dialogRef.close(this.data);
  // }


  // async saveContact() {
  //   this.setContactData();
  //   this.setLoading();
  //   await this.FBServices.updateCopmanyData(this.data.companyData);
  //   this.resetInputs();
  //   this.enableInputs();
  //   this.dialogRef.close();
  // }


  // setLoading() {
  //   this.disableInputs();
  //   this.allowAddBtn = false;
  //   this.loading = true;
  // }


  // disableInputs() {
  //   this.formData.firstName.disable();
  //   this.formData.lastName.disable();
  //   this.formData.department.disable();
  //   this.formData.mail.disable();
  //   this.formData.phone.disable();
  // }


  // enableInputs() {
  //   this.formData.firstName.enable();
  //   this.formData.lastName.enable();
  //   this.formData.department.enable();
  //   this.formData.mail.enable();
  //   this.formData.phone.enable();
  // }


  // setContactData() {
  //   if (this.data.index != null) this.changeContact(this.data.index)
  //   else this.pushContact();
  // }

  // changeContact(i: number){
  //   this.data.companyData.contacts[i].firstName = this.formService.getFormData(this.formData.firstName);
  //   this.data.companyData.contacts[i].lastName = this.formService.getFormData(this.formData.lastName);
  //   this.data.companyData.contacts[i].department = this.formService.getFormData(this.formData.department);
  //   this.data.companyData.contacts[i].mail = this.formService.getFormData(this.formData.mail);
  //   this.data.companyData.contacts[i].phone = parseInt(this.formService.getFormData(this.formData.phone));
  // }

  // pushContact(){
  //   let contact: ContactData = {
  //     firstName : this.formService.getFormData(this.formData.firstName),
  //     lastName : this.formService.getFormData(this.formData.lastName),
  //     department : this.formService.getFormData(this.formData.department),
  //     mail : this.formService.getFormData(this.formData.mail),
  //     phone : parseInt(this.formService.getFormData(this.formData.phone)),  
  //   }
  //   this.data.companyData.contacts.push(contact);
  // }


}
