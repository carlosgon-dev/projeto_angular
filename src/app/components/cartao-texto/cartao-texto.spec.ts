import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoTexto } from './cartao-texto';
import { Origem } from '../../models/origem';

describe('CartaoTexto', () => {
  let component: CartaoTexto;
  let fixture: ComponentFixture<CartaoTexto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoTexto],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoTexto);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('criacao', {
      id: 1,
      tipo: 'piada',
      pergunta: 'Um esqueleto entra num café e diz ao empregado:',
      remate: '— Um galão… e uma esfregona, se faz favor.',
      origem: Origem.Explorar,
      data_criacao: '2026-10-20T12:00:00',
      estrelas: 0,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
