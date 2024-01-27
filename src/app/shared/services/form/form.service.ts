import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  formUser = {
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(2)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(2)
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s\\-\'",.!?]+[0-9]*$'),
      Validators.minLength(3)
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(3)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    birthDate: new FormControl('', [
      Validators.pattern(/^[A-Za-z]{3} [A-Za-z]{3} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(.+\)$/i),
      Validators.minLength(2)
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    phone: new FormControl('', [
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(5)
    ]),
  }

  formCompany = {
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(2)
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZäöüÄÖÜß\\s]*$'),
      Validators.minLength(2)
    ]),
    no: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9a-zA-ZäöüÄÖÜß\\-\'",.!?]*$')
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(3)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    sector: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

  }
  
  getErrorMessage(varForm: FormControl, msgLabel: string) {
    if (varForm.hasError('required')) return msgLabel + ' is required';
    if (varForm.hasError('pattern') || varForm.hasError('minlength')) return (msgLabel + ' not valid');
    return ''
  }


  getTimeFromDate(date: Date): number | undefined {
    if (date) return date.getTime();
    else return NaN
  }


  getFormData(FormData: FormControl) {
    if (FormData.status == 'VALID' && FormData.value) return FormData.value;
    else return NaN
  }
}
