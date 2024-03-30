import { TestBed } from '@angular/core/testing';

import { UserProfileListService } from './user-profile-list.service';

describe('UserProfileListService', () => {
  let service: UserProfileListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
