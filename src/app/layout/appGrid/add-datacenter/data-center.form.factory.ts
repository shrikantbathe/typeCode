import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { DEFAULT_DROPDOWN_SELECTION, DataCenterForm } from "./data-center.form";

@Injectable()
export class DataCenterFormFactory {
  
constructor(private formBuilder: FormBuilder) { }
 
public create(): DataCenterForm {
const formGroup : FormGroup<any> = this.createDataCenterForm();
return new DataCenterForm(formGroup);
}

 
private createDataCenterForm(): FormGroup {

return this. formBuilder.group(  {

type: new FormControl('',[Validators.required, this.defaultAsError(DEFAULT_DROPDOWN_SELECTION)]),
region: new FormControl('',[Validators.required, this.defaultAsError(DEFAULT_DROPDOWN_SELECTION)]),
country: new FormControl('',[Validators.required, this.defaultAsError(DEFAULT_DROPDOWN_SELECTION)]),
environment: new FormControl('',[Validators.required, this.defaultAsError(DEFAULT_DROPDOWN_SELECTION)]),
value: new FormControl('',[Validators.required, this.defaultAsError(DEFAULT_DROPDOWN_SELECTION)]) 
});
}


public defaultAsError(defaultValue: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isDefaultSelected = (control.value || '').trim() === defaultValue;
    return isDefaultSelected ? { 'defaultSelection': true } : null;
     
}
}
}