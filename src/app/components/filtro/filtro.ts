import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoFiltro } from '../../models/filtro';

@Component({
  imports: [],
  selector: 'app-filtro',
  styleUrl: './filtro.css',
  templateUrl: './filtro.html',
})
export class Filtro {
  @Input() ativo: TipoFiltro = 'todos';
  @Output() mudar = new EventEmitter<TipoFiltro>();

  opcoes: { valor: TipoFiltro; nome: string }[] = [
    { valor: 'todos', nome: 'Tudo' },
    { valor: 'meme', nome: '🖼️ Memes' },
    { valor: 'piada', nome: '😂 Piadas' },
    { valor: 'adivinha', nome: '🧩 Adivinhas' },
  ];
}
