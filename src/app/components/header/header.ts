import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, signal } from '@angular/core';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menu_aberto = signal(false);

  alternar_menu(): void {
    this.menu_aberto.set(!this.menu_aberto());
  }

  fechar_menu(): void {
    this.menu_aberto.set(false);
  }
}
