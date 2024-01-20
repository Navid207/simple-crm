import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+ result);
    });
  }
}
