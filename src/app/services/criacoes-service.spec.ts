import { TestBed } from '@angular/core/testing';
import { CriacoesService } from './criacoes-service';

describe('CriacoesService', () => {
  let service: CriacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
