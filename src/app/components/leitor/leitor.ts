import { Component } from '@angular/core';
import { LeitorService } from '../../services/leitor-service';

@Component({
  imports: [],
  selector: 'app-leitor',
  styleUrl: './leitor.css',
  templateUrl: './leitor.html',
})
export class Leitor {
  constructor(public leitor: LeitorService) {}

  ao_mexer_no_volume(evento: Event): void {
    const barra = evento.target as HTMLInputElement;
    this.leitor.mudar_volume(Number(barra.value));
  }
}
