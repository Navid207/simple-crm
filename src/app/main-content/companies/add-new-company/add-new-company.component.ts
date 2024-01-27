import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../../shared/services/form/form.service';
import { MatIcon } from '@angular/material/icon';





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
    private _formBuilder: FormBuilder
  ) { }


  openDialogAddSUser(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: { userdata, settings },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
