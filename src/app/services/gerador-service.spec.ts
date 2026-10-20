import { TestBed } from '@angular/core/testing';
import { GeradorService } from './gerador-service';

describe('GeradorService', () => {
  let service: GeradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
