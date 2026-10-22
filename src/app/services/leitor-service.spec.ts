import { TestBed } from '@angular/core/testing';
import { LeitorService } from './leitor-service';

describe('LeitorService', () => {
  let service: LeitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
