import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../../shared/services/form/form.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { DialogAddSingle } from '../../../shared/dialogs/dialog-add-single/dialog-add-single.component';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { UsersSelectionListComponent } from '../../../shared/components/users-selection-list/users-selection-list.component';
import { FormSelectorComponent } from '../../../shared/components/form-selector/form-selector.component';
import { DialogCostumerComponent } from '../../../shared/dialogs/dialog-costumer/dialog-costumer.component';
import { ContactData } from '../../../shared/interfaces/contact-data';
import { ZipCodeService } from '../../../shared/services/zip-code/zip-code.service';
import { CompanyData } from '../../../shared/interfaces/company-data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenu, MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-add-new-company',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    FormSelectorComponent,
    UsersSelectionListComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenu,
    MatMenuModule,
  ],
  templateUrl: './add-new-company.component.html',
  styleUrl: './add-new-company.component.scss'
})
export class AddNewCompanyComponent {

  unsubSectors;

  formData = this.formService.formCompany;
  company: CompanyData = {
    name: '',
    street: '',
    no: '',
    zipCode: NaN,
    city: '',
    country: '',
    sector: ''
  };
  selectableSectors: string[] = [];
  serchZipCode!: number;
  selectableCitys: string[] = [];
  contactPersons: ContactData[] = [];
  allowAddBtn = false;
  closeAssignedTo = true;
  closeContacts = true;
  loadingAnimation = false;



  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  @ViewChild('user') userElement!: any;

  constructor(
    public formService: FormService,
    private _formBuilder: FormBuilder,
    private FBservices: FirebaseService,
    private zipCodeService: ZipCodeService,
    public dialog: MatDialog
  ) {
    this.unsubSectors = this.FBservices.subSectors();
  }

  ngOnDestroy() {
    this.unsubSectors();
  }

  openDialogAddSector(): void {
    const form = this.formData.sector;
    const element = 'sector'
    let id = ''
    const dialogRef = this.dialog.open
      (DialogAddSingle, { data: { form, element, id } });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      if (result.name && result.name.length >= 2) {
        this.formData.sector.setValue(result.name)
      }
    });
  }

  checkZipCode() {
    if (this.formData.zipCode.status === 'VALID') {
      let zip: number = parseInt(this.formService.getFormData(this.formData.zipCode));
      this.formData.city.enable();
      if (zip != this.serchZipCode) this.fillSelectableCitys(zip);
    }
    else {
      this.formData.city.disable();
      return
    }
  }

  fillSelectableCitys(zip: number) {
    this.formData.city.reset();
    this.serchZipCode = zip;
    this.zipCodeService.getArrayOfCitys(this.serchZipCode)
      .then((result: string[]) => {
        this.selectableCitys = result;
      })
      .catch((error) => {
        console.error('Error by filling the selectable Citys:', error);
      });
  }

  resteCitySelection() {
    this.formData.city.reset();
    this.enableAddCompany();
  }

  openDialogNewContact(): void {
    const contact: ContactData = {
      firstName: '', lastName: '', department: '', mail: '', phone: NaN
    };
    const dialogRef = this.dialog.open(DialogCostumerComponent, {
      data: { contact },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      if (result.contact) this.contactPersons.push(result.contact)
    });
  }


  deletContact(index: number) {
    this.contactPersons.splice(index, 1);
    if (this.contactPersons.length <= 0) {
      this.closeContacts = false;
      setTimeout(() => {
        this.closeContacts = true;
      }, 125);
    }

  }


  getSectors(): string[] {
    return this.FBservices.sectors
  }

  enableAddCompany() {
    this.allowAddBtn = false;
    const data = this.formData
    if (!data.name.valid) return
    if (!(data.sector.valid && data.sector.value != '')) return
    if (!data.street.valid) return
    if (!data.no.valid) return
    if (!data.zipCode.valid) return
    if (!(data.city.valid && data.city.value != '')) return
    else this.allowAddBtn = true;
  }

  onFormValueChange(value: string) {
    this.formData.sector.setValue(value);
    this.enableAddCompany();
  }

  async addCompany() {
    this.fillCompanyData();
    this.startLoading();
    await this.FBservices.addNewElement('companies', this.company)
    debugger
    this.resteInputs();
    this.stopLoading();

  }

  fillCompanyData() {
    this.company.name = this.formData.name.value || '';
    this.company.sector = this.formData.sector.value || '';
    this.company.street = this.formData.street.value || '';
    this.company.no = this.formData.no.value || '';
    this.company.zipCode = parseInt(this.formData.zipCode.value || '');
    this.company.city = this.splitFormDataCity()[1]
    this.company.country = this.splitFormDataCity()[0]
    this.company.contacts = this.contactPersons;
    this.company.assigned = this.userElement.selectedUserIds
  }

  splitFormDataCity() {
    if (!this.formData.city.value) return ['', '']
    let array = this.formData.city.value.split(" ")
    if (array.length <= 2) return array
    else {
      let country = array[0];
      let city = array.slice(1).join(" ");
      return [country, city]
    }
  }

  startLoading() {
    this.loadingAnimation = true;
    this.allowAddBtn = false;
    this.formData.name.disable();
    this.formData.street.disable();
    this.formData.no.disable();
    this.formData.zipCode.disable();
    this.closeAssignedTo = true;
  }

  stopLoading() {
    this.loadingAnimation = false;
    this.formData.name.enable();
    this.formData.street.enable();
    this.formData.no.enable();
    this.formData.zipCode.enable();
  }

  resteInputs() {
    this.formData.name.reset();
    this.formData.street.reset();
    this.formData.no.reset();
    this.formData.zipCode.reset();
    this.selectableSectors = [];
    this.contactPersons = [];
  }

  tooltipContacts(): string {
    if (this.contactPersons.length <= 0) return 'add new contact first'
    else return ''
  }

  tooltipAddBtn(): string {
    if (this.allowAddBtn) return ''
    else return 'please fill all required fields'
  }

}
