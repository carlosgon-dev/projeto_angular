import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CriacoesService } from '../../services/criacoes-service';
import { MemeService } from '../../services/meme-service';
import { Criacao } from '../../models/criacao';
import { TemplateMeme } from '../../models/template-meme';
import { CartaoMeme } from '../../components/cartao-meme/cartao-meme';
import { Estrelas } from '../../components/estrelas/estrelas';
import { Estrelas as Nota } from '../../models/criacao-base';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { TipoFiltro } from '../../models/filtro';
import { Filtro } from '../../components/filtro/filtro';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Janela } from '../../components/janela/janela';
import { SomService } from '../../services/som-service';

const MAXIMO_TEXTO = 150;
const MAXIMO_DICA = 60;
const SOM_FRACASSO = 'sons/fracasso.mp3';

const ROTULOS: Record<Criacao['tipo'], [string, string]> = {
  meme: ['Texto de cima', 'Texto de baixo'],
  piada: ['A pergunta da piada', 'O remate'],
  adivinha: ['A adivinha', 'A resposta'],
};

@Component({
  imports: [DatePipe, CartaoMeme, Estrelas, CartaoTexto, Filtro, ReactiveFormsModule, Janela],
  selector: 'app-criado-por-ti',
  styleUrl: './criado-por-ti.css',
  templateUrl: './criado-por-ti.html',
})
export class CriadoPorTi implements OnInit {
  criacoes = signal<Criacao[]>([]);
  templates = signal<TemplateMeme[]>([]);
  filtro = signal<TipoFiltro>('meme');
  em_edicao = signal<Criacao | null>(null);
  a_carregar = signal(true);
  erro = signal(false);

  form_edicao = new FormGroup({
    parte_1: new FormControl('', [Validators.required, Validators.maxLength(MAXIMO_TEXTO)]),
    parte_2: new FormControl('', [Validators.required, Validators.maxLength(MAXIMO_TEXTO)]),
    dica: new FormControl('', [Validators.maxLength(MAXIMO_DICA)]),
  });

  rotulos = ROTULOS;

  constructor(
    private criacoes_service: CriacoesService,
    private meme_service: MemeService,
    private som_service: SomService,
  ) {}

  ngOnInit(): void {
    this.carregar();
    this.meme_service.listar_templates().subscribe((lista) => this.templates.set(lista));
  }

  carregar(): void {
    this.a_carregar.set(true);
    this.erro.set(false);
    this.criacoes_service.listar().subscribe({
      next: (lista) => {
        this.criacoes.set(lista);
        this.a_carregar.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.a_carregar.set(false);
        this.som_service.tocar(SOM_FRACASSO);
      },
    });
  }

  imagem_do_template(template_id: string): string {
    const template = this.templates().find((t) => t.id === template_id);
    return template ? template.imagem : '';
  }

  criacoes_filtradas(): Criacao[] {
    return this.criacoes().filter((criacao) => criacao.tipo === this.filtro());
  }

  apagar(id: number): void {
    this.criacoes_service.apagar(id).subscribe((restantes) => {
      this.criacoes.set(restantes);
    });
  }

  avaliar(id: number, nota: Nota): void {
    this.criacoes_service.avaliar(id, nota).subscribe((lista) => {
      this.criacoes.set(lista);
    });
  }

  abrir_edicao(criacao: Criacao): void {
    this.em_edicao.set(criacao);

    switch (criacao.tipo) {
      case 'meme':
        this.form_edicao.setValue({
          parte_1: criacao.texto_cima,
          parte_2: criacao.texto_baixo,
          dica: '',
        });
        break;
      case 'piada':
        this.form_edicao.setValue({ parte_1: criacao.pergunta, parte_2: criacao.remate, dica: '' });
        break;
      case 'adivinha':
        this.form_edicao.setValue({
          parte_1: criacao.pergunta,
          parte_2: criacao.resposta,
          dica: criacao.dica ?? '',
        });
        break;
    }
  }

  guardar_edicao(): void {
    const criacao = this.em_edicao();
    if (!criacao || this.form_edicao.invalid) return;

    this.criacoes_service.editar(criacao.id, this.ler_alteracoes(criacao)).subscribe((lista) => {
      this.criacoes.set(lista);
      this.em_edicao.set(null);
    });
  }

  private ler_alteracoes(criacao: Criacao): Partial<Criacao> {
    const parte_1 = this.form_edicao.value.parte_1 ?? '';
    const parte_2 = this.form_edicao.value.parte_2 ?? '';
    const dica = this.form_edicao.value.dica ?? '';

    switch (criacao.tipo) {
      case 'meme':
        return { texto_cima: parte_1, texto_baixo: parte_2 };
      case 'piada':
        return { pergunta: parte_1, remate: parte_2 };
      case 'adivinha':
        return { pergunta: parte_1, resposta: parte_2, dica: dica || undefined };
    }
  }
}
