import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { IDataCenter } from '../../core/IDataCenter';

interface DataCenter {
  type: string;
  country: string;
  region: string;
  environment: string;
  destinationDataCenter: string;
  floorRoom: string;
}

export const DEFAULT_DROPDOWN_SELECTION = '-1';

export class DataCenterForm {

  private _showFloor: boolean;
  private _showJustification: boolean;
  private _dataCenters: IDataCenter[];

  public typeOptions: Set<string> = new Set();
  public regionOptions: Set<string> = new Set();
  public countryOptions: Set<string> = new Set();
  public environmentOptions: Set<string> = new Set();
  public dataCenterOptions: Set<string> = new Set();
  public ivValidity$: Observable<boolean>;


  get asFormGroup(): FormGroup { return this.formGroup; }

  private get selectedType(): string { return this.formGroup.get('type').value; }

  private get selectedRegion(): string { return this.formGroup.get('region').value; }

  private get selectedCountry(): string { return this.formGroup.get('country').value; }

  private get selectedEnvironment(): string { return this.formGroup.get('environment').value; }

  private get selectedDataCenter(): string { return this.formGroup.get('value').value; }

  private get selectedFloor(): string { return this.formGroup.get('floorRoom').value; }

  private get selectedJustification(): string { return this.formGroup.get('justification').value; }

  private get selectedDeploymentId(): string[] { return this.formGroup.get('deploymentId').value; }

  private onChanges(): void {
    this.onTypeChange();
    this.onRegionChange();
    // this.onCountryChange();
    // this.onEnvironmentChange();
    // this.onDestinationDataCenterChange();

  }

  private onTypeChange(): void {
    this.formGroup.get('type').valueChanges
      .pipe()
      .subscribe(type => {
        this.regionOptions = new Set(
          this._dataCenters
            .filter(dataCenter => dataCenter.destinationType === type)

            .map(dataCenter => dataCenter.destinationRegion)
        );
    //    this.resetRegion();
    //    this.resetCountry();
        this.dataCenterOptions = new Set();
      });
  }

  private onRegionChange(): void {
    this.formGroup.get('region').valueChanges
      .pipe()
      .subscribe(region => {
        this.countryOptions = new Set(
          this._dataCenters
            .filter(dataCenter => dataCenter.destinationType === this.selectedType)
            .filter(dataCenter => dataCenter.destinationRegion === region)
            .map(dataCenter => dataCenter.destinationCountry)
        );

     //   this.resetCountry();
     //   this.resetEnvironment();
        this.dataCenterOptions = new Set();

      });
  }


  private setTypeOptions(): void {
    this.typeOptions = new Set(
      Object.keys(_.groupBy(this._dataCenters, 'type'))
    )
  }

  public setDataCenters(list: IDataCenter[]): void {
    this._dataCenters = list;
    this.setTypeOptions();

    this.typeOptions = new Set(Object.keys(_.groupBy(this._dataCenters, 'destinationType')));
    this.countryOptions = new Set(Object.keys(_.groupBy(this._dataCenters, 'destinationCountry')));
    this.environmentOptions = new Set(Object.keys(_.groupBy(this._dataCenters, 'destinationEnvironment')));
    

  }

  public inValid(): boolean {
    return this.formGroup.invalid;
  }

  public value(): any {
    return this.formGroup.value;
  }

  // deploymentId : string;
  // destinationCountry: string;
  // destinationEnvironment : string;
  // destinationType : string;
  // destinationDataCenter : string;
  // destinationRegion : string;

  constructor(private formGroup: FormGroup) {
    this.onChanges();
  }

  public reset(): void {

    this.resetRegion();
    this.resetCountry();
    this.resetEnvironment();
    this.resetRegion();
    this.resetValue();
    this.resettype();
  }

  private resetRegion(): void { this.formGroup.get('region').reset('-1', { emitEvent: false }); }
  private resetCountry(): void { this.formGroup.get('country').reset('-1', { emitEvent: false }); }
  private resettype(): void { this.formGroup.get('type').reset('-1', { emitEvent: false }); }
  private resetEnvironment(): void { this.formGroup.get('environment').reset('-1', { emitEvent: false }); }
  private resetValue(): void { this.formGroup.get('value').reset('-1', { emitEvent: false }); }


}




