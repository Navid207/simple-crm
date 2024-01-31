import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MenueService } from '../../shared/services/menue/menue.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { CompanyData } from '../../shared/interfaces/company-data';
import { DialogDeleteComponent } from '../../shared/dialogs/dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-companies',
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
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

  unsubCopanies;
  orderBy:'name'| 'city' | 'country' | 'sector' = 'name';  
  selectedRowIndex!: number;


  constructor(private menue: MenueService, private FBServices: FirebaseService,public dialog: MatDialog) {
    this.menue.setActivCategory('companies');
    this.unsubCopanies = this.FBServices.subCompanies(this.orderBy);
  }

  ngOnDestroy() {
    this.unsubCopanies();
  }

  getCompanies(): CompanyData[] {
    return this.FBServices.companies;
  }

  changeOrder(orderBy : 'name'| 'city' | 'country' | 'sector') {
    this.orderBy = orderBy;
    this.unsubCopanies();
    this.unsubCopanies = this.FBServices.subCompanies(this.orderBy);
  }


  selectRow(index: number): void {
    if (index >= 0) this.selectedRowIndex = index;
    else this.selectedRowIndex = NaN;
  }

  openDialogDelet(id: String | undefined, collection: String, title: string): void {
    if (!id) return
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { id, collection, title },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
  
}

