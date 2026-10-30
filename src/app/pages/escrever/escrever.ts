import { CriacoesService } from '../../services/criacoes-service';
import { NovoTexto } from '../../models/criacao';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { Origem } from '../../models/origem';
import { Component, OnInit, signal } from '@angular/core';
import { MemeService } from '../../services/meme-service';
import { TemplateMeme } from '../../models/template-meme';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Filtro } from '../../components/filtro/filtro';
import { TipoFiltro } from '../../models/filtro';

const LIMITES = {
  minimo_pergunta: 10,
  maximo_pergunta: 150,
  minimo_resposta: 2,
  maximo_resposta: 100,
  maximo_dica: 60,
  minimo_autor: 3,
};

@Component({
  imports: [RouterLink, FormsModule, ReactiveFormsModule, Filtro, CartaoTexto],
  selector: 'app-escrever',
  styleUrl: './escrever.css',
  templateUrl: './escrever.html',
})
export class Escrever implements OnInit {
  templates = signal<TemplateMeme[]>([]);
  a_carregar = signal(true);
  erro = signal(false);
  tipo = signal<TipoFiltro>('meme');

  pesquisa = '';
  limites = LIMITES;

  form_texto = new FormGroup({
    pergunta: new FormControl('', [
      Validators.required,
      Validators.minLength(LIMITES.minimo_pergunta),
      Validators.maxLength(LIMITES.maximo_pergunta),
    ]),
    resposta: new FormControl('', [
      Validators.required,
      Validators.minLength(LIMITES.minimo_resposta),
      Validators.maxLength(LIMITES.maximo_resposta),
    ]),
    dica: new FormControl('', [Validators.maxLength(LIMITES.maximo_dica)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(LIMITES.minimo_autor)]),
    email: new FormControl('', [Validators.email]),
  });

  constructor(
    private meme_service: MemeService,
    private criacoes_service: CriacoesService,
    private router: Router,
  ) {}

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

  templates_filtrados(): TemplateMeme[] {
    const termo = this.pesquisa.trim().toLowerCase();
    return this.templates().filter((template) => template.nome.toLowerCase().includes(termo));
  }

  rascunho(): NovoTexto {
    const valores = this.form_texto.value;
    const pergunta = valores.pergunta ?? '';
    const resposta = valores.resposta ?? '';
    const autor = valores.autor ?? '';

    if (this.tipo() === 'adivinha') {
      return {
        tipo: 'adivinha',
        pergunta,
        resposta,
        dica: valores.dica || undefined,
        autor,
        origem: Origem.Mao,
      };
    }
    return { tipo: 'piada', pergunta, remate: resposta, autor, origem: Origem.Mao };
  }

  guardar_texto(): void {
    if (this.form_texto.invalid) return;
    this.criacoes_service.criar(this.rascunho()).subscribe(() => this.router.navigate(['/criado']));
  }
}
