import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Criacao, NovaCriacao } from '../models/criacao';
import { Estrelas } from '../models/criacao-base';


const CHAVE_GAVETA = 'arena-criacoes';

@Injectable({
  providedIn: 'root',
})
export class CriacoesService {
  listar(): Observable<Criacao[]> {
    return of(this.ler_gaveta());
  }

  criar(dados: NovaCriacao): Observable<Criacao> {
    const criacoes = this.ler_gaveta();
    const nova: Criacao = {
      ...dados,
      id: Date.now(),
      data_criacao: new Date().toISOString(),
      estrelas: 0,
    };
    criacoes.unshift(nova);
    this.gravar_gaveta(criacoes);
    return of(nova);
  }

  apagar(id: number): Observable<Criacao[]> {
    const restantes = this.ler_gaveta().filter((criacao) => criacao.id !== id);
    this.gravar_gaveta(restantes);
    return of(restantes);
  }

  avaliar(id: number, estrelas: Estrelas): Observable<Criacao[]> {
    const criacoes = this.ler_gaveta().map((criacao) =>
      criacao.id === id ? { ...criacao, estrelas } : criacao,
    );
    this.gravar_gaveta(criacoes);
    return of(criacoes);
  }



  private ler_gaveta(): Criacao[] {
    const texto = localStorage.getItem(CHAVE_GAVETA);
    if (!texto) return [];
    return JSON.parse(texto);
  }

  private gravar_gaveta(criacoes: Criacao[]): void {
    localStorage.setItem(CHAVE_GAVETA, JSON.stringify(criacoes));
  }
}
