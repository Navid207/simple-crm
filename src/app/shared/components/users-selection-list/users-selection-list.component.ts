import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FirebaseService } from '../../services/firebase/firebase.service';



@Component({
  selector: 'app-users-selection-list',
  standalone: true,
  imports: [
    MatSelectModule,
    MatListModule,
  ],
  templateUrl: './users-selection-list.component.html',
  styleUrl: './users-selection-list.component.scss'
})
export class UsersSelectionListComponent {

  selectedUserIds: string[] = [];

  unsubUsers;

  constructor(private FBservices: FirebaseService,) {
    this.unsubUsers = this.FBservices.subUsers('firstName');
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  getUsers() {
    return this.FBservices.users;
  }

  toggleIdToSelectedUsesIds(id: string | undefined) {
    if (!id) return
    if (this.selectedUserIds.find(existingId => existingId === id)) {
      this.selectedUserIds = this.selectedUserIds.filter(e => e !== id)
    } else {
      this.selectedUserIds.push(id)
    } 
  }

}
