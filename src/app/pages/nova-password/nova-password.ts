import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

const MINIMO_PASSWORD = 6;
const MENSAGEM_GENERICA = 'Não foi possível mudar a password. Tenta outra vez.';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-nova-password',
  styleUrl: './nova-password.css',
  templateUrl: './nova-password.html',
})
export class NovaPassword {
  a_enviar = signal(false);
  erro = signal('');
  mudada = signal(false);
  minimo_password = MINIMO_PASSWORD;

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(MINIMO_PASSWORD)]),
    confirmar: new FormControl('', [Validators.required]),
  });

  constructor(public auth_service: AuthService) {}

  passwords_diferentes(): boolean {
    return this.form.value.password !== this.form.value.confirmar;
  }

  submeter(): void {
    if (this.form.invalid || this.passwords_diferentes()) return;
    this.a_enviar.set(true);
    this.erro.set('');

    this.auth_service.mudar_password(this.form.value.password ?? '').subscribe({
      next: () => {
        this.a_enviar.set(false);
        this.mudada.set(true);
      },
      error: () => {
        this.a_enviar.set(false);
        this.erro.set(MENSAGEM_GENERICA);
      },
    });
  }
}
