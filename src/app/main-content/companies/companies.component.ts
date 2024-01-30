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

  constructor(private menue: MenueService, private FBServices: FirebaseService) {
    this.menue.setActivCategory();
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

  
}

