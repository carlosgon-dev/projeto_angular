import { Injectable, signal } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  utilizador = signal<User | null>(null);
  sessao_verificada = signal(false);

  constructor(private supabase_service: SupabaseService) {
    this.supabase_service.cliente.auth.onAuthStateChange((_evento, sessao) => {
      this.utilizador.set(sessao?.user ?? null);
      this.sessao_verificada.set(true);
    });
  }

  registar(email: string, password: string): Observable<void> {
    const pedido = this.supabase_service.cliente.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: document.baseURI },
    });
    return from(pedido).pipe(map((resposta) => this.ok_ou_erro(resposta.error)));
  }

  entrar(email: string, password: string): Observable<void> {
    const pedido = this.supabase_service.cliente.auth.signInWithPassword({ email, password });
    return from(pedido).pipe(map((resposta) => this.ok_ou_erro(resposta.error)));
  }

  sair(): Observable<void> {
    const pedido = this.supabase_service.cliente.auth.signOut();
    return from(pedido).pipe(map((resposta) => this.ok_ou_erro(resposta.error)));
  }

  recuperar_password(email: string): Observable<void> {
    const pedido = this.supabase_service.cliente.auth.resetPasswordForEmail(email, {
      redirectTo: document.baseURI + 'nova-password',
    });
    return from(pedido).pipe(map((resposta) => this.ok_ou_erro(resposta.error)));
  }

  mudar_password(password: string): Observable<void> {
    const pedido = this.supabase_service.cliente.auth.updateUser({ password });
    return from(pedido).pipe(map((resposta) => this.ok_ou_erro(resposta.error)));
  }

  private ok_ou_erro(erro: { message: string } | null): void {
    if (erro) throw new Error(erro.message);
  }
}
