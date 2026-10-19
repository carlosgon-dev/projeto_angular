import { Component, Input, signal } from '@angular/core';
import { Piada } from '../../models/piada';
import { Adivinha } from '../../models/adivinha';

@Component({
  imports: [],
  selector: 'app-cartao-texto',
  styleUrl: './cartao-texto.css',
  templateUrl: './cartao-texto.html',
})
export class CartaoTexto {
  @Input() criacao!: Piada | Adivinha;
  revelada = signal(false);
}
