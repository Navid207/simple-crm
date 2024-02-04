import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { FormService } from '../../services/form/form.service';
import { CompanyData } from '../../../shared/interfaces/company-data';
import { UsersSelectionListComponent } from '../../components/users-selection-list/users-selection-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserData } from '../../interfaces/user-data';
import { first } from 'rxjs';


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
export class DialogUserselectionComponent {
  newUser = false;
  loading = false;
  allowAddBtn = false;
  dialogTitle = '';
  id?: string;
  oldList: string[] = [];
  selectetList = [];

  @ViewChild('userlist') userList!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUserselectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FBServices: FirebaseService,
    public formService: FormService
  ) {
    if (data.companyData.assigned){
      this.oldList =[...data.companyData.assigned];
    }
  }

  checkChange() {
    let oldList = JSON.stringify(this.oldList.sort());
    let newList = JSON.stringify(this.userList.selectedUserIds.sort());
    if (oldList !== newList) {
      this.allowAddBtn = true;
    }
    else this.allowAddBtn = false;
  }

  async save() {
    this.data.companyData.assigned = this.userList.selectedUserIds;
    this.loading = true;
    this.setAssignedAtUsers();
    await this.FBServices.updateCopmanyData(this.data.companyData);    
    this.oldList = this.userList.selectedUserIds;
    this.loading = false;
    this.closeDialog();
  }


  setAssignedAtUsers(){
    let toAdd:string[] = this.compareArrays(this.userList.selectedUserIds,this.oldList);
    let users: UserData[] =  this.userList.getUsers();
    for (let i = 0; i < users.length; i++) {
      let id = users[i].id;
      if (!id) return
      if (toAdd.indexOf(id) !== -1)  users[i].assigned.push(id);
    }
      
    let toDellet = this.compareArrays(this.oldList, this.userList.selectedUserIds);

  }


  compareArrays(NewArray:string[], OldArray:string[]) {
    let uniqueInNewArray = NewArray.filter(item => !OldArray.includes(item));  
    return uniqueInNewArray
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
