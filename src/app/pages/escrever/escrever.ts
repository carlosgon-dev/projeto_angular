import { CriacoesService } from '../../services/criacoes-service';
import { NovaCriacao } from '../../models/criacao';
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

@Component({
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  selector: 'app-escrever',
  styleUrl: './escrever.css',
  templateUrl: './escrever.html',
})
export class Escrever implements OnInit {
  templates = signal<TemplateMeme[]>([]);
  a_carregar = signal(true);
  erro = signal(false);
  tipo = signal<'meme' | 'piada' | 'adivinha'>('meme');

  pesquisa = '';

  form_texto = new FormGroup({
    pergunta: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
    ]),
    resposta: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    dica: new FormControl('', [Validators.maxLength(60)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
  });

  templates_filtrados(): TemplateMeme[] {
    const termo = this.pesquisa.trim().toLowerCase();
    return this.templates().filter((template) => template.nome.toLowerCase().includes(termo));
  }

  constructor(
    private meme_service: MemeService,
    private criacoes_service: CriacoesService,
    private router: Router

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

    guardar_texto(): void {
    if (this.form_texto.invalid) return;

    const valores = this.form_texto.value;
    const pergunta = valores.pergunta ?? '';
    const resposta = valores.resposta ?? '';
    const autor = valores.autor ?? '';

    const rascunho: NovaCriacao =
      this.tipo() === 'adivinha'
        ? { tipo: 'adivinha', pergunta, resposta, dica: valores.dica || undefined, autor, origem: Origem.Mao }
        : { tipo: 'piada', pergunta, remate: resposta, autor, origem: Origem.Mao };

    this.criacoes_service.criar(rascunho).subscribe(() => {
      this.router.navigate(['/criado']);
    });
  }

}
