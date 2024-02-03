import { Component, Inject, ViewChild } from '@angular/core';
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
export class DialogUserselectionComponent {
  newUser = false;
  loading = false;
  allowAddBtn = false;
  dialogTitle = '';
  id?: string;
  oldList = [];

  @ViewChild('userlist') userList!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUserselectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FBServices: FirebaseService,
    public formService: FormService
  ) {
    if (data.companyData.assigned) this.oldList = data.companyData.assigned;
  }

  checkChange() {
    let oldList = JSON.stringify(this.oldList.sort());
    let newList = JSON.stringify(this.userList.selectedUserIds.sort());
    if (oldList !== newList) {
      this.allowAddBtn = true;
    }
    else this.allowAddBtn = false;
  }

  test() {
    debugger
  }

  async save() {
    this.oldList = this.userList.selectedUserIds;
    this.data.companyData.assigned = this.userList.selectedUserIds;
    this.loading = true;
    await this.FBServices.updateCopmanyData(this.data.companyData);
    this.loading = false;
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }



}
