import { Component, OnInit, signal } from '@angular/core';
import { ExplorarService } from '../../services/explorar-service';
import { Piada } from '../../models/piada';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { Janela } from '../../components/janela/janela';

const PAUSA_DEPOIS_DO_VOTO_MS = 650;
const LUGARES_NO_PODIO = 3;
const PONTOS_PARA_VENCER = 5;
const MEDALHAS = ['🥇', '🥈', '🥉'];

interface LugarNoPodio {
  piada: Piada;
  pontos: number;
}

@Component({
  imports: [CartaoTexto, Janela],
  selector: 'app-arena',
  styleUrl: './arena.css',
  templateUrl: './arena.html',
})
export class Arena implements OnInit {
  piadas = signal<Piada[]>([]);
  pontos = signal<number[]>([]);
  par = signal<[number, number]>([0, 1]);
  vencedora = signal<number | null>(null);
  piada_aberta = signal<Piada | undefined>(undefined);
  final = signal(false);
  medalhas = MEDALHAS;
  pontos_para_vencer = PONTOS_PARA_VENCER;

  constructor(private explorar_service: ExplorarService) {}

  ngOnInit(): void {
    this.explorar_service.listar_piadas().subscribe((lista) => {
      this.piadas.set(lista);
      this.nova_ronda();
    });
  }

  votar(lado: number): void {
    if (this.vencedora() !== null) return;
    const indice = this.par()[lado];
    this.pontos.set(this.pontos().map((p, i) => (i === indice ? p + 1 : p)));
    this.vencedora.set(lado);
    setTimeout(() => {
      this.vencedora.set(null);
      if (this.pontos()[indice] >= PONTOS_PARA_VENCER) {
        this.final.set(true);
        return;
      }
      this.novo_duelo();
    }, PAUSA_DEPOIS_DO_VOTO_MS);
  }

  nova_ronda(): void {
    this.pontos.set(this.piadas().map(() => 0));
    this.final.set(false);
    this.novo_duelo();
  }

  podio(): LugarNoPodio[] {
    return this.piadas()
      .map((piada, i) => ({ piada, pontos: this.pontos()[i] }))
      .filter((lugar) => lugar.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, LUGARES_NO_PODIO);
  }

  private novo_duelo(): void {
    const total = this.piadas().length;
    if (total < 2) return;
    const a = Math.floor(Math.random() * total);
    let b = Math.floor(Math.random() * total);
    while (b === a) b = Math.floor(Math.random() * total);
    this.par.set([a, b]);
  }
}
