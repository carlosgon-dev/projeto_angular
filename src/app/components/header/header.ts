import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { SomService } from '../../services/som-service';

const SOM_SAIR = 'sons/vaias.mp3';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menu_aberto = signal(false);

  constructor(
    public auth_service: AuthService,
    private router: Router,
    private som_service: SomService,
  ) {}

  sair(): void {
    this.fechar_menu();
    this.som_service.tocar(SOM_SAIR);
    this.auth_service.sair().subscribe(() => this.router.navigate(['/']));
  }

  alternar_menu(): void {
    this.menu_aberto.set(!this.menu_aberto());
  }

  fechar_menu(): void {
    this.menu_aberto.set(false);
  }
}
