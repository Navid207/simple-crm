import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyData } from '../../../shared/interfaces/company-data';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersSelectionListComponent } from '../../../shared/components/users-selection-list/users-selection-list.component';
import { MenueService } from '../../../shared/services/menue/menue.service';
import { DialogCompanyComponent } from '../../../shared/dialogs/dialog-company/dialog-company.component';
import { DialogCostumerComponent } from '../../../shared/dialogs/dialog-costumer/dialog-costumer.component';
import { DialogDeleteComponent } from '../../../shared/dialogs/dialog-delete/dialog-delete.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserData } from '../../../shared/interfaces/user-data';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogUserselectionComponent } from '../../../shared/dialogs/dialog-userselection/dialog-userselection.component';


@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterLink,
    UsersSelectionListComponent
  ],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent {


  id: string = '';
  getUserDataActiv = false;
  assignments: UserData[] = [];
  currentAssignments: string[] = [];
  companyData;

  constructor(private router: ActivatedRoute, private FBServices: FirebaseService, public dialog: MatDialog, private menue: MenueService) {
    this.router.params.subscribe(params => {
      this.id = params['id']
    })
    this.companyData = this.FBServices.subCompany(this.id);
    this.menue.setActivCategory('companies');
  }

  ngOnDestroy() {
    this.companyData();
  }

  getCompany(): CompanyData {
    this.checkUserData();
    return this.FBServices.company;
  }


  checkUserData() {
    if (this.FBServices.company.assigned.length == 0) {
      this.assignments = [];
      return
    }
    if (!this.getUserDataActiv && this.currentAssignments != this.FBServices.company.assigned) {
      this.getUserDataActiv = true
      this.fillUserData()
    }
  }


  async fillUserData() {
    this.currentAssignments = this.FBServices.company.assigned;
    this.assignments = [];
    for (let i = 0; i < this.currentAssignments.length; i++) {
      let id = this.currentAssignments[i];
      let user = await this.FBServices.getSingleUserDoc(id);
      if (user != null) this.assignments.push(user);
    }
    this.getUserDataActiv = false;
  }

getTooltipTextContacts():string{
  if (this.getCompany().contacts.length == 0) return 'No contact found. Please add a contact.'
  else return''
}

getTooltipTextAssignments():string{
  if (this.getCompany().contacts.length == 0) return 'No assigned person found. Please link it to a user.'
  else return''
}

  openDialogCompany(companyData: CompanyData, settings: 'general' | 'contacts' | 'assinments'): void {
    companyData.id = this.id;
    const dialogRef = this.dialog.open(DialogCompanyComponent, {
      data: { companyData, settings }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  openDialogNewContact(companyData: CompanyData, settings: 'new' | 'change', index: number | null): void {
    companyData.id = this.id;
    const dialogRef = this.dialog.open(DialogCostumerComponent, {
      data: { companyData, settings, index },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.contact) this.FBServices.company.contacts?.push(result.contact)
    });
  }

  openDialogUserselecton (companyData: CompanyData): void {
    companyData.id = this.id;
    const dialogRef = this.dialog.open(DialogUserselectionComponent, {
      data: { companyData },
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result && result.contact) this.FBServices.company.contacts?.push(result.contact)
    });
  }

  openDialogDelet(companyData: CompanyData, collection: String, title: string): void {
    if (!companyData.id) return
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { companyData, collection, title },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
