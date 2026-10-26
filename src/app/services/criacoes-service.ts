import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap, timeout } from 'rxjs';
import { Criacao, NovaCriacao } from '../models/criacao';
import { Estrelas } from '../models/criacao-base';
import { SupabaseService } from './supabase-service';

const TABELA = 'criacoes';
const TEMPO_MAXIMO_MS = 10000;

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
    return from(pedido).pipe(
      timeout(TEMPO_MAXIMO_MS),
      map((resposta) => this.dados_ou_erro<Criacao[]>(resposta)),
    );
  }

  criar(dados: NovaCriacao): Observable<Criacao> {
    const pedido = this.supabase_service.cliente
      .from(TABELA)
      .insert(dados as Record<string, unknown>)
      .select()
      .single();
    return from(pedido).pipe(
      timeout(TEMPO_MAXIMO_MS),
      map((resposta) => this.dados_ou_erro<Criacao>(resposta)),
    );
  }

  apagar(id: number): Observable<Criacao[]> {
    const pedido = this.supabase_service.cliente.from(TABELA).delete().eq('id', id);
    return this.e_depois_listar(pedido);
  }

  avaliar(id: number, estrelas: Estrelas): Observable<Criacao[]> {
    const pedido = this.supabase_service.cliente.from(TABELA).update({ estrelas }).eq('id', id);
    return this.e_depois_listar(pedido);
  }

  editar(id: number, alteracoes: Partial<Criacao>): Observable<Criacao[]> {
    const pedido = this.supabase_service.cliente
      .from(TABELA)
      .update(alteracoes as Record<string, unknown>)
      .eq('id', id);
    return this.e_depois_listar(pedido);
  }

  private dados_ou_erro<T>(resposta: { data: unknown; error: { message: string } | null }): T {
    if (resposta.error) throw new Error(resposta.error.message);
    return resposta.data as T;
  }

  private e_depois_listar(
    pedido: PromiseLike<{ data: unknown; error: { message: string } | null }>,
  ): Observable<Criacao[]> {
    return from(pedido).pipe(
      timeout(TEMPO_MAXIMO_MS),
      map((resposta) => this.dados_ou_erro(resposta)),
      switchMap(() => this.listar()),
    );
  }
}
