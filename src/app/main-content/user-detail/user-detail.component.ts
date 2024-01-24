import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { UserData } from '../../shared/interfaces/user-data';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../users/dialog-user/dialog-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  id: string = '';
  unsubData;


  constructor(private router: ActivatedRoute, private userServices: FirebaseService, public dialog: MatDialog) {
    this.router.params.subscribe(params => {
      this.id = params['id']
    })
    this.unsubData = this.userServices.subUser(this.id);
  }


  getUser(): UserData {
    return this.userServices.user;
  }


  ngOnDestroy() {
    this.unsubData();
  }


  openDialogUser(userdata: UserData, settings: 'general' | 'address'): void { 
    userdata.id = this.id;
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: {userdata, settings}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
