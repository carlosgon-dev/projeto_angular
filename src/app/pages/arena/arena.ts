import { Component, OnInit, signal } from '@angular/core';
import { ExplorarService } from '../../services/explorar-service';
import { Piada } from '../../models/piada';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';

const PAUSA_DEPOIS_DO_VOTO_MS = 650;
const LUGARES_NO_PODIO = 3;

@Component({
  imports: [CartaoTexto],
  selector: 'app-arena',
  styleUrl: './arena.css',
  templateUrl: './arena.html',
})
export class Arena implements OnInit {
  piadas = signal<Piada[]>([]);
  pontos = signal<number[]>([]);
  par = signal<[number, number]>([0, 1]);
  vencedora = signal<number | null>(null);

  constructor(private explorar_service: ExplorarService) {}

  ngOnInit(): void {
    this.explorar_service.listar_piadas().subscribe((lista) => {
      this.piadas.set(lista);
      this.pontos.set(lista.map(() => 0));
      this.novo_duelo();
    });
  }

  votar(lado: number): void {
    if (this.vencedora() !== null) return;
    const indice = this.par()[lado];
    this.pontos.set(this.pontos().map((p, i) => (i === indice ? p + 1 : p)));
    this.vencedora.set(lado);
    setTimeout(() => {
      this.vencedora.set(null);
      this.novo_duelo();
    }, PAUSA_DEPOIS_DO_VOTO_MS);
  }

  podio(): { piada: Piada; pontos: number }[] {
    return this.piadas()
      .map((piada, i) => ({ piada, pontos: this.pontos()[i] }))
      .filter((lugar) => lugar.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, LUGARES_NO_PODIO);
  }

  private novo_duelo(): void {
    const total = this.piadas().length;
    const a = Math.floor(Math.random() * total);
    let b = Math.floor(Math.random() * total);
    while (b === a) b = Math.floor(Math.random() * total);
    this.par.set([a, b]);
  }
}
