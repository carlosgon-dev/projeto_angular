import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { PedidoGerador } from '../models/pedido-gerador';
import { NovaCriacao } from '../models/criacao';
import { Origem } from '../models/origem';
import { MODELOS_ADIVINHA, MODELOS_PIADA } from '../dados/modelos-gerador';

const TEMPO_A_PENSAR_MS = 1500;
const MALDADE_MAXIMA_SUAVE = 3;
const MALDADE_MAXIMA_MAROTA = 7;

@Injectable({
  providedIn: 'root',
})
export class GeradorService {
  gerar(pedido: PedidoGerador): Observable<NovaCriacao> {
    const modelos = pedido.tipo === 'adivinha' ? MODELOS_ADIVINHA[pedido.estilo] : MODELOS_PIADA[pedido.estilo];
    const modelo = modelos[this.nivel_da_maldade(pedido.maldade)];
    const { pergunta, segunda_parte } = modelo(pedido);

    const resultado: NovaCriacao =
      pedido.tipo === 'adivinha'
        ? { tipo: 'adivinha', pergunta, resposta: segunda_parte, origem: Origem.IA }
        : { tipo: 'piada', pergunta, remate: segunda_parte, origem: Origem.IA };

    return of(resultado).pipe(delay(TEMPO_A_PENSAR_MS));
  }

  private nivel_da_maldade(maldade: number): number {
    if (maldade <= MALDADE_MAXIMA_SUAVE) return 0;
    if (maldade <= MALDADE_MAXIMA_MAROTA) return 1;
    return 2;
  }
}
