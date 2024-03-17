import { TestBed } from '@angular/core/testing';

import { DecomAlertPopupDataService } from './decom-alert-popup-data.service';

describe('DecomAlertPopupDataService', () => {
  let service: DecomAlertPopupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecomAlertPopupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
