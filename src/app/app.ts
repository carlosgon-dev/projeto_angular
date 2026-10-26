import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Leitor } from './components/leitor/leitor';
import { Surpresa } from './components/surpresa/surpresa';
import { Entrar } from './pages/entrar/entrar';
import { AuthService } from './services/auth-service';

@Component({
  imports: [RouterOutlet, Header, Leitor, Surpresa, Entrar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  pagina_privada = signal(false);

  constructor(
    public auth_service: AuthService,
    private router: Router,
  ) {
    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationEnd) this.pagina_privada.set(this.rota_e_privada());
    });
  }

  private rota_e_privada(): boolean {
    let rota = this.router.routerState.snapshot.root;
    while (rota.firstChild) rota = rota.firstChild;
    return rota.data['privada'] === true;
  }
}
