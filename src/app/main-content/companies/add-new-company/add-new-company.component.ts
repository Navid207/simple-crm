import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../../shared/services/form/form.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddSingle } from '../../../shared/dialogs/dialog-add-single/dialog-add-single.component';





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
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-new-company.component.html',
  styleUrl: './add-new-company.component.scss'
})
export class AddNewCompanyComponent {

  formData = this.formService.formCompany;
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
    public dialog: MatDialog
  ) { }


  openDialogAddSector(): void {
    const form = this.formData.sector;
    const element = 'sector'
    let id =''
    const dialogRef = this.dialog.open(DialogAddSingle, {
      data: { form, element, id},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) console.log(result)
    });
  }

}
