import { Component, DebugElement } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { UserData } from '../../../shared/interfaces/user-data';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../../../shared/dialogs/dialog-user/dialog-user.component';
import { MenueService } from '../../../shared/services/menue/menue.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompanyData } from '../../../shared/interfaces/company-data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatChipsModule,
    MatExpansionModule,    
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  id: string = '';
  getCompanyDataActiv = false;
  assignments: CompanyData[] = [];
  currentAssignments: string[] = [];
  unsubData;


  constructor(private router: ActivatedRoute, private FBServices: FirebaseService, public dialog: MatDialog, private menue: MenueService) {
    this.router.params.subscribe(params => {
      this.id = params['id']
    })
    this.unsubData = this.FBServices.subUser(this.id);
    this.menue.setActivCategory('users');
  }


  getUser(): UserData {
    this.checkCompanyData();
    return this.FBServices.user;
  }


  ngOnDestroy() {
    this.unsubData();
  }


  openDialogUser(userdata: UserData, settings: 'general' | 'address' | 'all'): void {
    userdata.id = this.id;
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: { userdata, settings }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }


  getTooltipTextAssignments():string{
    if (this.getUser().assigned.length == 0) return 'No assigned company found. Please link it to a user.'
    else return''
  }


  checkCompanyData() {
    if (this.FBServices.user.assigned.length == 0) {
      this.assignments = [];
      return
    }
    if (!this.getCompanyDataActiv && this.currentAssignments != this.FBServices.user.assigned) {
      this.getCompanyDataActiv = true
      this.fillCompanyData()
    }
  }


  async fillCompanyData() {
    this.currentAssignments = this.FBServices.user.assigned;
    this.assignments = [];
    let deletAssimentsIndex = [];
    for (let i = 0; i < this.currentAssignments.length; i++) {
      let id = this.currentAssignments[i];
      let company = await this.FBServices.getSingleCompanyDoc(id);
      if (company != null && company.assigned.indexOf(this.id) !== -1) this.assignments.push(company);
      else deletAssimentsIndex.push(i)
    }
    deletAssimentsIndex.forEach(index => { this.currentAssignments.splice(index,1)});
    await this.FBServices.updateUserData(this.FBServices.user);
    this.getCompanyDataActiv = false;
  }
}
