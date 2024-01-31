import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormService } from '../../services/form/form.service';
import { FormSelectorComponent } from '../../components/form-selector/form-selector.component';
import { CompanyData } from '../../interfaces/company-data';
import { MatCardModule } from '@angular/material/card';
import { ZipCodeService } from '../../services/zip-code/zip-code.service';
import { ContactData } from '../../interfaces/contact-data';


@Component({
  selector: 'app-dialog-company',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FormSelectorComponent
  ],
  templateUrl: './dialog-company.component.html',
  styleUrl: './dialog-company.component.scss'
})
export class DialogCompanyComponent {
  generalInfo = false;
  serchZipCode!: number;
  loading = false;
  allowAddBtn = false;
  dialogTitle = '';
  id?: string;
  formData = this.formService.formCompany;
  selectableCitys: string[] = [];
  contactPersons: ContactData[] = [];
  assignments: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<DialogCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FBServices: FirebaseService,
    public formService: FormService,    
    private zipCodeService: ZipCodeService,
  ) {
    if (!data.settings) return
    else this.setInfos(data.companyData, data.settings);
    this.formData.city.disable();
  }



  setInfos(companyData: CompanyData, settings: 'general' | 'contacts' | 'assinments') {
    this.data = companyData;
    this.setFormDataValues(companyData);
    if (settings === 'general') {
      this.dialogTitle = 'General information';
      this.generalInfo = true;
    }
    // if (settings === 'address') {
    //   this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName + ' ' + 'Address';
    //   this.userInfoAddress = true;
    // }
    // if (settings === 'all') {
    //   this.dialogTitle = userdatas.firstName + ' ' + userdatas.lastName;
    //   this.userInfoAddress = true;
    //   this.userInfoGeneral = true;
    // }
  }


  setFormDataValues(data: CompanyData) {
    this.id = data.id;
    this.formData.name.setValue(data.name);
    this.formData.sector.setValue(data.sector);
    this.formData.street.setValue(data.street);
    this.formData.no.setValue(data.no);
    this.formData.zipCode.setValue(data.zipCode.toString());
    this.formData.city.setValue(data.country+' '+data.city);
    if (data.contacts) this.contactPersons = data.contacts;
    if (data.assigned) this.assignments = data.assigned;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  async saveCompanyData() {
    debugger
    this.setCompanyData();
    this.setLoading();
    // await this.FBServices.updateCopmanyData(this.data);
    this.dialogRef.close();
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

  setLoading() {
    this.disableInputs();
    this.allowAddBtn = false;
    this.loading = true;
  }


  disableInputs() {
    this.formData.name.disable();
    this.formData.sector.disable();
    this.formData.street.disable();
    this.formData.no.disable();
    this.formData.zipCode.disable();
    // this.formData.no.disable();
  }


  onFormValueChange(value: string) {
    this.formData.sector.setValue(value);
    this.enableSave();
  }


  setCompanyData() {
    this.data.name = this.formData.name.value || '';
    this.data.sector = this.formData.sector.value || '';
    this.data.street = this.formData.street.value || '';
    this.data.no = this.formData.no.value || '';
    this.data.zipCode = parseInt(this.formData.zipCode.value || '');
    this.data.city = this.splitFormDataCity()[1]
    this.data.country = this.splitFormDataCity()[0]
    this.data.contacts = this.contactPersons;
    this.data.assigned = this.assignments
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

  enableSave() {
    this.allowAddBtn = false;
    if (!this.formData.name.valid) return
    if (!this.formData.sector.valid) return
    if (!this.formData.street.valid) return
    if (!this.formData.no.valid) return
    if (!this.formData.zipCode.valid) return
    // if (!this.formData.no.valid) return
    else this.allowAddBtn = true;
  }


}
