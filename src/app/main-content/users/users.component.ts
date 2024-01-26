import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../../shared/dialogs/dialog-user/dialog-user.component';
import { UserData } from '../../shared/interfaces/user-data';
import { RouterLink } from '@angular/router';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DialogDeleteComponent } from '../../shared/dialogs/dialog-delete/dialog-delete.component';
import { MenueComponent } from '../../shared/components/menue/menue.component';
import { MenueService } from '../../shared/services/menue/menue.service';



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
  orderBy = 'firstName';
  selectedRowIndex!: number;

  constructor(public dialog: MatDialog, private userServices: FirebaseService, private menue: MenueService) {
    this.menue.setActivCategory();
    this.unsubUsers = this.userServices.subUsers(this.orderBy);
  }

  changeUsersOrder(orderBy: string) {
    this.orderBy = orderBy;
    this.unsubUsers();
    this.unsubUsers = this.userServices.subUsers(this.orderBy);
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


  selectRow(index: number): void {
    if (index >= 0) this.selectedRowIndex = index;
    else this.selectedRowIndex = NaN;
  }

}
