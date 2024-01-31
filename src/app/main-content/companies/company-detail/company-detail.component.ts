import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyData } from '../../../shared/interfaces/company-data';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersSelectionListComponent } from '../../../shared/components/users-selection-list/users-selection-list.component';
import { MenueService } from '../../../shared/services/menue/menue.service';
import { DialogCompanyComponent } from '../../../shared/dialogs/dialog-company/dialog-company.component';


@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
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

}
