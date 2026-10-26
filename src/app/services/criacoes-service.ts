import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Criacao, NovaCriacao } from '../models/criacao';
import { Estrelas } from '../models/criacao-base';
import { SupabaseService } from './supabase-service';

const CHAVE_GAVETA = 'arena-criacoes';
const TABELA = 'criacoes';

@Injectable({
  providedIn: 'root',
})
export class CriacoesService {
  constructor(private supabase_service: SupabaseService) {}

  listar(): Observable<Criacao[]> {
    const pedido = this.supabase_service.cliente
      .from(TABELA)
      .select('*')
      .order('data_criacao', { ascending: false });
    return from(pedido).pipe(map((resposta) => this.dados_ou_erro<Criacao[]>(resposta)));
  }

  criar(dados: NovaCriacao): Observable<Criacao> {
    const pedido = this.supabase_service.cliente
      .from(TABELA)
      .insert(dados as Record<string, unknown>)
      .select()
      .single();
    return from(pedido).pipe(map((resposta) => this.dados_ou_erro<Criacao>(resposta)));
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

  editar(id: number, alteracoes: Partial<Criacao>): Observable<Criacao[]> {
    const criacoes = this.ler_gaveta().map((criacao) =>
      criacao.id === id ? ({ ...criacao, ...alteracoes } as Criacao) : criacao,
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

  private dados_ou_erro<T>(resposta: { data: unknown; error: { message: string } | null }): T {
    if (resposta.error) throw new Error(resposta.error.message);
    return resposta.data as T;
  }
}
