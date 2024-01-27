import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-dialog-section',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-section.component.html',
  styleUrl: './dialog-section.component.scss'
})
export class DialogSectionComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseServices: FirebaseService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
