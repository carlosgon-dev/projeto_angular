import { Component, OnInit, signal } from '@angular/core';
import { MemeService } from '../../services/meme-service';
import { TemplateMeme } from '../../models/template-meme';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-escrever',
  styleUrl: './escrever.css',
  templateUrl: './escrever.html',
})
export class Escrever implements OnInit {
  templates = signal<TemplateMeme[]>([]);
  a_carregar = signal(true);
  erro = signal(false);

  pesquisa = '';

  templates_filtrados(): TemplateMeme[] {
    const termo = this.pesquisa.trim().toLowerCase();
    return this.templates().filter((template) =>
      template.nome.toLowerCase().includes(termo),
    );
  }


  constructor(private meme_service: MemeService) {}

  ngOnInit(): void {
    this.meme_service.listar_templates().subscribe({
      next: (lista) => {
        this.templates.set(lista);
        this.a_carregar.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.a_carregar.set(false);
      },
    });
  }

}
