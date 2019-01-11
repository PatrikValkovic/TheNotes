import {TestBed} from '@angular/core/testing';

import {SettingRepositoryService} from './setting-repository.service';

describe('SettingRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingRepositoryService = TestBed.get(SettingRepositoryService);
    expect(service).toBeTruthy();
  });
});
