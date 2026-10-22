import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OPCOES_CRIACOES, OpcaoFiltro, TipoFiltro } from '../../models/filtro';

@Component({
  imports: [],
  selector: 'app-filtro',
  styleUrl: './filtro.css',
  templateUrl: './filtro.html',
})
export class Filtro {
  @Input() ativo: TipoFiltro = 'meme';
  @Output() mudar = new EventEmitter<TipoFiltro>();

  @Input() opcoes: OpcaoFiltro[] = OPCOES_CRIACOES;

}
