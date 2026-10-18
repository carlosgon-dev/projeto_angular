import { Component, OnInit, signal } from '@angular/core';
import { ExplorarService} from '../../services/explorar-service';
import { Piada } from '../../models/piada';

@Component({
  imports: [],
  selector: 'app-explorar',
  styleUrl: './explorar.css',
  templateUrl: './explorar.html',
})
export class Explorar implements OnInit {
  templates = signal<Piada[]>([]);                        // ← 2. a caixa começa vazia

  constructor(private explorarService: ExplorarService) {}

  ngOnInit(): void {
    this.explorarService.listarPiadas().subscribe((lista) => {
      this.templates.set(lista);                                 // ← 3. pôr a lista na caixa
    });
  }
}



