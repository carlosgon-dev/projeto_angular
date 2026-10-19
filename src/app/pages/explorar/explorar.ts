import { Component, OnInit, signal } from '@angular/core';
import { ExplorarService } from '../../services/explorar-service';
import { Piada } from '../../models/piada';

@Component({
  imports: [],
  selector: 'app-explorar',
  styleUrl: './explorar.css',
  templateUrl: './explorar.html',
})
export class Explorar implements OnInit {
  piadas = signal<Piada[]>([]);

  constructor(private explorar_service: ExplorarService) {}

  ngOnInit(): void {
    this.explorar_service.listar_piadas().subscribe((lista) => {
      this.piadas.set(lista);
    });
  }
}
