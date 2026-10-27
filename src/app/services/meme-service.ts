import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, timeout } from 'rxjs';
import { TemplateMeme } from '../models/template-meme';
import { MemeImgflip, RespostaImgflip } from '../models/imgflip';

const ENDERECO_IMGFLIP = 'https://api.imgflip.com/get_memes';
const PLANO_B = 'dados/memes.json';
const TEMPO_MAXIMO_MS = 8000;

@Injectable({
  providedIn: 'root',
})
export class MemeService {
  constructor(private http: HttpClient) {}

  listar_templates(): Observable<TemplateMeme[]> {
    return this.http.get<RespostaImgflip>(ENDERECO_IMGFLIP).pipe(
      timeout(TEMPO_MAXIMO_MS),
      map((resposta) => {
        if (!resposta.success) throw new Error('O Imgflip não respondeu bem');
        return resposta.data.memes.map((meme) => this.traduzir(meme));
      }),
      catchError((erro) => {
        console.warn('🖼️ Imgflip falhou, uso o plano B:', erro);
        return this.http.get<TemplateMeme[]>(PLANO_B);
      }),
    );
  }

  private traduzir(meme: MemeImgflip): TemplateMeme {
    return { id: meme.id, nome: meme.name, imagem: meme.url };
  }
}
