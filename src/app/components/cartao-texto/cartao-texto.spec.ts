import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoTexto } from './cartao-texto';

describe('CartaoTexto', () => {
  let component: CartaoTexto;
  let fixture: ComponentFixture<CartaoTexto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoTexto],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoTexto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
