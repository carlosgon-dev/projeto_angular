import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

const MINIMO_PASSWORD = 6;
const MENSAGEM_GENERICA = 'Algo correu mal. Tenta outra vez.';

/* O Supabase responde em inglês: traduzimos as mensagens mais comuns */
const TRADUCOES: Record<string, string> = {
  'Invalid login credentials': 'Email ou password errados.',
  'Email not confirmed': 'Ainda não confirmaste o teu email. Vê a tua caixa de correio 📧',
  'User already registered': 'Já existe uma conta com este email.',
};

type Modo = 'entrar' | 'registar';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-entrar',
  styleUrl: './entrar.css',
  templateUrl: './entrar.html',
})
export class Entrar {
  modo = signal<Modo>('entrar');
  a_enviar = signal(false);
  erro = signal('');
  aviso = signal('');
  minimo_password = MINIMO_PASSWORD;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(MINIMO_PASSWORD)]),
  });

  constructor(
    private auth_service: AuthService,
    private router: Router,
  ) {}

  trocar_modo(): void {
    this.modo.set(this.modo() === 'entrar' ? 'registar' : 'entrar');
    this.erro.set('');
    this.aviso.set('');
  }

  submeter(): void {
    if (this.form.invalid) return;
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';
    this.a_enviar.set(true);
    this.erro.set('');
    this.aviso.set('');

    const pedido =
      this.modo() === 'entrar'
        ? this.auth_service.entrar(email, password)
        : this.auth_service.registar(email, password);

    pedido.subscribe({
      next: () => this.correu_bem(),
      error: (erro: Error) => this.correu_mal(erro),
    });
  }

  private correu_bem(): void {
    this.a_enviar.set(false);
    if (this.modo() === 'entrar') {
      if (this.router.url === '/entrar') this.router.navigate(['/criado']);
      return;
    }
    this.aviso.set('📧 Enviámos-te um email! Confirma a tua conta e depois entra.');
    this.modo.set('entrar');
  }

  private correu_mal(erro: Error): void {
    this.a_enviar.set(false);
    this.erro.set(TRADUCOES[erro.message] ?? MENSAGEM_GENERICA);
  }
}
