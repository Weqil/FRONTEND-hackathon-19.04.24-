import { TestBed } from '@angular/core/testing';

import { CheckAuthCanActiveGuard } from './check-auth.canactive.guard';

describe('CheckAuthCanactiveGuard', () => {
  let guard: CheckAuthCanActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAuthCanActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
