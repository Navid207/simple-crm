import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    UsersSelectionListComponent
  ],
  templateUrl: './add-new-company.component.html',
  styleUrl: './add-new-company.component.scss'
})
export class AddNewCompanyComponent {

  unsubSectors;

  formData = this.formService.formCompany;
  selectableSectors: string[] = [];
  selectableCitys: string[] = [];
  


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    public formService: FormService,
    private _formBuilder: FormBuilder,
    private FBservices: FirebaseService,
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

  openDialogNewContact(): void {
    const dialogRef = this.dialog.open(DialogCostumerComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  getSectors(): string[] {
    return this.FBservices.sectors
  }
}
