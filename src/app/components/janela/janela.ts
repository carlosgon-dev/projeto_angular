import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-janela',
  styleUrl: './janela.css',
  templateUrl: './janela.html',
})
export class Janela {
  @Output() fechar = new EventEmitter<void>();
}
