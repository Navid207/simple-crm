import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyData } from '../../../shared/interfaces/company-data';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersSelectionListComponent } from '../../../shared/components/users-selection-list/users-selection-list.component';
import { MenueService } from '../../../shared/services/menue/menue.service';
import { DialogCompanyComponent } from '../../../shared/dialogs/dialog-company/dialog-company.component';
import { DialogCostumerComponent } from '../../../shared/dialogs/dialog-costumer/dialog-costumer.component';
import { DialogDeleteComponent } from '../../../shared/dialogs/dialog-delete/dialog-delete.component';
import {MatBadgeModule} from '@angular/material/badge';


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
    UsersSelectionListComponent
  ],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent {


  id: string = '';
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
    return this.FBServices.company;
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

  openDialogDelet(companyData: CompanyData, collection: String, title: string): void {
    if (!companyData.id) return
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { companyData, collection, title },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
