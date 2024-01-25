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

  async delet(){
    this.loading = true;
    await this.firebaseServices.delete(this.data.id,this.data.collection);
    this.dialogRef.close();
  }



}
