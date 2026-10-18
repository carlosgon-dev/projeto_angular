import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Escrever } from './escrever';

describe('Escrever', () => {
  let component: Escrever;
  let fixture: ComponentFixture<Escrever>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escrever],
    }).compileComponents();

    fixture = TestBed.createComponent(Escrever);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
