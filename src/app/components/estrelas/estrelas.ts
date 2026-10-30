import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estrelas as Nota } from '../../models/criacao-base';
import { SomService } from '../../services/som-service';

const SOM_ESTRELA = 'sons/brilho.mp3';

@Component({
  imports: [],
  selector: 'app-estrelas',
  styleUrl: './estrelas.css',
  templateUrl: './estrelas.html',
})
export class Estrelas {
  @Input() valor: Nota = 0;
  @Output() avaliar = new EventEmitter<Nota>();
  numeros: Nota[] = [1, 2, 3, 4, 5];

  constructor(private som_service: SomService) {}

  escolher(numero: Nota): void {
    const nova_nota = numero === this.valor ? 0 : numero;
    this.som_service.tocar_efeito(SOM_ESTRELA);
    this.avaliar.emit(nova_nota);
  }
}
