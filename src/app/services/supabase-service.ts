import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createClient } from '@supabase/supabase-js';
import { catchError, from, map, Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment';

const TEMPO_MAXIMO_MS = 8000;

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly cliente = createClient(environment.supabase_url, environment.supabase_key);

  constructor(private http: HttpClient) {}

  ler_tabela<T>(tabela: string, plano_b: string): Observable<T[]> {
    const pedido = this.cliente.from(tabela).select('*').order('id');
    return from(pedido).pipe(
      timeout(TEMPO_MAXIMO_MS),
      map((resposta) => {
        if (resposta.error) throw resposta.error;
        return resposta.data as T[];
      }),
      catchError((erro) => {
        console.warn(`🗄️ A tabela "${tabela}" falhou, uso o plano B:`, erro);
        return this.http.get<T[]>(plano_b);
      }),
    );
  }
}
