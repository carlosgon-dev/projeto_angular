import { Component, Input, signal } from '@angular/core';
import { Piada } from '../../models/piada';
import { Adivinha } from '../../models/adivinha';
import { NovoTexto } from '../../models/criacao';

@Component({
  imports: [],
  selector: 'app-cartao-texto',
  styleUrl: './cartao-texto.css',
  templateUrl: './cartao-texto.html',
})
export class CartaoTexto {
  @Input() criacao!: Piada | Adivinha | NovoTexto;
  revelada = signal(false);
  dica_visivel = signal(false);
}
