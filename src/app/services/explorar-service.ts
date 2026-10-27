import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, timeout } from 'rxjs';
import { Piada } from '../models/piada';
import { Adivinha } from '../models/adivinha';
import { MemeInternet } from '../models/meme-internet';
import { MemeReddit, RespostaMemeApi } from '../models/meme-api';
import { SupabaseService } from './supabase-service';

const ENDERECO_MEME_API = 'https://meme-api.com/gimme/20';
const PLANO_B_MEMES = 'dados/memes-internet.json';
const TEMPO_MAXIMO_MS = 8000;

@Injectable({
  providedIn: 'root',
})
export class ExplorarService {
  constructor(
    private http: HttpClient,
    private supabase_service: SupabaseService,
  ) {}

  listar_piadas(): Observable<Piada[]> {
    return this.supabase_service.ler_tabela<Piada>('piadas', 'dados/piadas.json');
  }

  listar_adivinhas(): Observable<Adivinha[]> {
    return this.supabase_service.ler_tabela<Adivinha>('adivinhas', 'dados/adivinhas.json');
  }

  listar_memes(): Observable<MemeInternet[]> {
    return this.http.get<RespostaMemeApi>(ENDERECO_MEME_API).pipe(
      timeout(TEMPO_MAXIMO_MS),
      map((resposta) => resposta.memes.map((meme, posicao) => this.traduzir(meme, posicao))),
      catchError((erro) => {
        console.warn('😂 meme-api falhou, uso o plano B:', erro);
        return this.http.get<MemeInternet[]>(PLANO_B_MEMES);
      }),
    );
  }

  private traduzir(meme: MemeReddit, posicao: number): MemeInternet {
    return { id: posicao + 1, titulo: meme.title, imagem: meme.url, votos: meme.ups };
  }
}
