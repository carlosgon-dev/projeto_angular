import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriadoPorTi } from './criado-por-ti';

describe('CriadoPorTi', () => {
  let component: CriadoPorTi;
  let fixture: ComponentFixture<CriadoPorTi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriadoPorTi],
    }).compileComponents();

    fixture = TestBed.createComponent(CriadoPorTi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
