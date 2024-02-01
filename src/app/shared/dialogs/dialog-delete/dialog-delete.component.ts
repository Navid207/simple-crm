import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-dialog-delet',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseServices: FirebaseService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async delet() {
    this.loading = true;
    await this.deletOptions();
    this.dialogRef.close();
  }

  async deletOptions() {
    if (this.data.collection.search('contact-') >= 0) await this.deletContact();
    else await this.firebaseServices.delete(this.data.id, this.data.collection)
  }

  async deletContact() {
    let i = parseInt(this.data.collection.split('-')[1]);
    this.data.companyData.contacts.splice(i,1)
    await this.firebaseServices.updateCopmanyData(this.data.companyData);
  }

}
