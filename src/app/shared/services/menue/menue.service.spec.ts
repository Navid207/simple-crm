import { TestBed } from '@angular/core/testing';

import { MenueService } from './menue.service';

describe('MenueService', () => {
  let service: MenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
