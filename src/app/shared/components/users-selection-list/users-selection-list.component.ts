import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { BooleanInput } from '@angular/cdk/coercion';



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
export class UsersSelectionListComponent implements OnChanges {

  @Input() selectetIdList: string[] | undefined;
  selectedUserIds: string[] = [];

  unsubUsers;

  constructor(private FBservices: FirebaseService,) {
    this.unsubUsers = this.FBservices.subUsers('firstName');
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.selectetIdList) this.selectedUserIds = this.selectetIdList;
    }
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

  setSelected(id: string | undefined):BooleanInput {
    if (!id)return false
    let i = this.selectedUserIds.indexOf(id);
    if (i>=0) return true
    else return false
  }

  

}
