import { Injectable } from '@angular/core';
import { FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(
      field => {
        console.log(field);
        const control = formGroup.get(field);
        if (control instanceof UntypedFormControl) {
          control.markAsTouched({ onlySelf: true })
        } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
          control.markAsTouched({ onlySelf: true })
          this.validateAllFormFields(control);
        }
      });
  }

  getErrorMessage(fieldName: string, formGroup: UntypedFormGroup) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return "Campo obrigatorio";
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 5;
      return `Campo maximo ${requiredLength}`;
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 200;
      return `Campo minino ${requiredLength}`;
    }
    return "campo inválido";
  }

  getFormArrayFiledErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {

    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }

}
