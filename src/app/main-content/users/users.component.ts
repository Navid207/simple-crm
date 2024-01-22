import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { UserData } from '../../shared/interfaces/user-data';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users!: UserData[];

  
  constructor(public dialog: MatDialog, private userServices: FirebaseService ) {}

  

  ngOnInit() {
    this.users = this.userServices.subUsers();
  }


  ngOnDestroy() {
    this.users;
  }


  openDialogUser(userdata: UserData): void { 
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: {userdata},
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
