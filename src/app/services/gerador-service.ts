import { Injectable } from '@angular/core';
import { Observable, catchError, delay, from, map, of, tap, timeout } from 'rxjs';
import { PedidoGerador } from '../models/pedido-gerador';
import { NovoTexto } from '../models/criacao';
import { Origem } from '../models/origem';
import { MODELOS_ADIVINHA, MODELOS_PIADA } from '../dados/modelos-gerador';
import { SupabaseService } from './supabase-service';

const FUNCAO_IA = 'gerar-piada_ia';
const TEMPO_MAXIMO_IA_MS = 15000;
const TEMPO_A_PENSAR_MS = 1500;
const AUTOR_IA = 'IA (Gemini)';
const AUTOR_MODELOS = 'Frases-modelo';
const MALDADE_MAXIMA_SUAVE = 3;
const MALDADE_MAXIMA_MAROTA = 7;

/* O que a IA (e as frases-modelo) devolvem */
interface TextoGerado {
  pergunta: string;
  segunda_parte: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeradorService {
  constructor(private supabase_service: SupabaseService) {}

  gerar(pedido: PedidoGerador): Observable<NovoTexto> {
    const pedido_ia = this.supabase_service.cliente.functions.invoke<TextoGerado>(FUNCAO_IA, {
      body: pedido,
    });

    return from(pedido_ia).pipe(
      timeout(TEMPO_MAXIMO_IA_MS),
      map((resposta) => this.texto_valido(resposta.data, resposta.error)),
      tap(() => console.info('🤖 Gerado pela IA (Gemini)')),
      map((texto) => this.montar_criacao(pedido, texto, AUTOR_IA)),
      catchError(() => {
        console.info('📝 Gerado com as frases-modelo (plano B)');
        const texto = this.gerar_com_modelos(pedido);
        return of(this.montar_criacao(pedido, texto, AUTOR_MODELOS)).pipe(delay(TEMPO_A_PENSAR_MS));
      }),
    );
  }

  private texto_valido(dados: TextoGerado | null, erro: unknown): TextoGerado {
    if (erro || !dados?.pergunta || !dados?.segunda_parte) throw new Error('Resposta da IA inválida');
    return dados;
  }

  private gerar_com_modelos(pedido: PedidoGerador): TextoGerado {
    const modelos = pedido.tipo === 'adivinha' ? MODELOS_ADIVINHA[pedido.estilo] : MODELOS_PIADA[pedido.estilo];
    const modelo = modelos[this.nivel_da_maldade(pedido.maldade)];
    return modelo(pedido);
  }

  /* O autor diz de onde veio: da IA ou das frases-modelo */
  private montar_criacao(pedido: PedidoGerador, texto: TextoGerado, autor: string): NovoTexto {
    const { pergunta, segunda_parte } = texto;
    return pedido.tipo === 'adivinha'
      ? { tipo: 'adivinha', pergunta, resposta: segunda_parte, autor, origem: Origem.IA }
      : { tipo: 'piada', pergunta, remate: segunda_parte, autor, origem: Origem.IA };
  }

  private nivel_da_maldade(maldade: number): number {
    if (maldade <= MALDADE_MAXIMA_SUAVE) return 0;
    if (maldade <= MALDADE_MAXIMA_MAROTA) return 1;
    return 2;
  }
}
