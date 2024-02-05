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
  id = '';
  oldList: string[] = [];
  selectetList = [];

  @ViewChild('userlist') userList!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUserselectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FBServices: FirebaseService,
    public formService: FormService
  ) {
    if (data.companyData.assigned) this.oldList = [...data.companyData.assigned];
    if (data.companyData.id) this.id = data.companyData.id;
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
    await this.setAssignedAtUsers();
    await this.FBServices.updateCopmanyData(this.data.companyData);
    this.oldList = this.userList.selectedUserIds;
    this.loading = false;
    this.closeDialog();
  }


  async setAssignedAtUsers() {
    let userListId = this.userList.selectedUserIds;
    let users: UserData[] = this.userList.getUsers();
    for (let i = 0; i < users.length; i++) {
      let id = users[i].id;
      if (!id) return
      if (userListId.indexOf(id) === -1) {
        let index = users[i].assigned.indexOf(this.id);
        if (index !== -1) await this.updateUserData(users[i], index)
        continue
      }
      if (users[i].assigned.indexOf(this.id) === -1) await this.updateUserData(users[i], undefined)
    }
  }


  async updateUserData(user:UserData, index: number | undefined){
    if (index) user.assigned.splice(index, 1);
    else user.assigned.push(this.id);
    await this.FBServices.updateUserData(user);
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
