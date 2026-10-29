import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, AbstractControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { SomService } from '../../services/som-service';

const MINIMO_PASSWORD = 6;
const SOM_ENTRAR = 'sons/aplausos.mp3';
const SOM_FRACASSO = 'sons/fracasso.mp3';
const MENSAGEM_GENERICA = 'Algo correu mal. Tenta outra vez.';

const TRADUCOES: Record<string, string> = {
  'Invalid login credentials': 'Email ou password errados.',
  'Email not confirmed': 'Ainda não confirmaste o teu email. Vê a tua caixa de correio 📧',
  'User already registered': 'Já existe uma conta com este email.',
};

type Modo = 'entrar' | 'registar' | 'recuperar';

const TITULOS: Record<Modo, string> = {
  entrar: '🔐 Entrar na Arena',
  registar: '📝 Criar conta',
  recuperar: '🔑 Recuperar password',
};

const BOTOES: Record<Modo, string> = {
  entrar: 'Entrar',
  registar: 'Registar',
  recuperar: 'Enviar email',
};

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
  titulos = TITULOS;
  botoes = BOTOES;

  form = new FormGroup({
    nome: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(MINIMO_PASSWORD)]),
  });

  constructor(
    private auth_service: AuthService,
    private router: Router,
    private som_service: SomService,
  ) {}

  mudar_modo(novo: Modo): void {
    this.modo.set(novo);
    this.erro.set('');
    this.aviso.set('');
    this.ligar_se(this.form.controls.nome, novo === 'registar');
    this.ligar_se(this.form.controls.password, novo !== 'recuperar');
  }

  private ligar_se(controlo: AbstractControl, ligado: boolean): void {
    if (ligado) {
      controlo.enable();
      return;
    }
    controlo.disable();
  }


  submeter(): void {
    if (this.form.invalid) return;
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';
    this.a_enviar.set(true);
    this.erro.set('');
    this.aviso.set('');

    this.pedido_do_modo(email, password).subscribe({
      next: () => this.correu_bem(),
      error: (erro: Error) => this.correu_mal(erro),
    });
  }

  private pedido_do_modo(email: string, password: string): Observable<void> {
    switch (this.modo()) {
      case 'entrar':
        return this.auth_service.entrar(email, password);
      case 'registar':
        return this.auth_service.registar(email, password, this.form.value.nome ?? '');
      case 'recuperar':
        return this.auth_service.recuperar_password(email);
    }
  }

  private correu_bem(): void {
    this.a_enviar.set(false);
    if (this.modo() === 'entrar') {
      this.som_service.tocar_efeito(SOM_ENTRAR);
      if (this.router.url === '/entrar') this.router.navigate(['/criado']);
      return;
    }
    const mensagem =
      this.modo() === 'registar'
        ? '📧 Enviámos-te um email! Confirma a tua conta e depois entra.'
        : '📧 Enviámos-te um email com um link para escolheres uma password nova.';
    this.mudar_modo('entrar');
    this.aviso.set(mensagem);
  }

  private correu_mal(erro: Error): void {
    this.som_service.tocar_efeito(SOM_FRACASSO);
    this.a_enviar.set(false);
    this.erro.set(TRADUCOES[erro.message] ?? MENSAGEM_GENERICA);
  }
}
