import { Component, EventEmitter, Input, Output } from '@angular/core'; // + EventEmitter, Output
import { Estrelas as Nota } from '../../models/criacao-base';

@Component({
  imports: [],
  selector: 'app-estrelas',
  styleUrl: './estrelas.css',
  templateUrl: './estrelas.html',
})
export class Estrelas {
  @Input() valor: Nota = 0;
  @Output() avaliar = new EventEmitter<Nota>(); // + Output
  numeros: Nota[] = [1, 2, 3, 4, 5];

  escolher(numero: Nota): void {
    const nova_nota = numero === this.valor ? 0 : numero;
    this.avaliar.emit(nova_nota);
  }
}
