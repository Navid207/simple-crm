import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../../shared/dialogs/dialog-user/dialog-user.component';
import { UserData } from '../../shared/interfaces/user-data';
import { RouterLink } from '@angular/router';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { DialogDeleteComponent } from '../../shared/dialogs/delete/dialog-delete.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatMenu,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  unsubUsers;

  constructor(public dialog: MatDialog, private userServices: FirebaseService) {
    this.unsubUsers = this.userServices.subUsers()
  }

  ngOnDestroy() {
    this.unsubUsers();
  }


  getUsers(): UserData[] {
    return this.userServices.users;
  }


  openDialogUser(userdata: UserData, settings: 'general' | 'address' | 'all'): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: { userdata, settings },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }


  openDialogDelet(id: String | undefined, collection: String, title: string): void {
    if (!id) return
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { id, collection, title },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }


  openDialogNewUser(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
