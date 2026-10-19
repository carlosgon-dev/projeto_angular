import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CriacoesService } from '../../services/criacoes-service';
import { MemeService } from '../../services/meme-service';
import { Criacao } from '../../models/criacao';
import { TemplateMeme } from '../../models/template-meme';
import { CartaoMeme, } from '../../components/cartao-meme/cartao-meme';
import { Estrelas } from '../../components/estrelas/estrelas';
import { Estrelas as Nota } from '../../models/criacao-base';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';

@Component({
  imports: [DatePipe, CartaoMeme, Estrelas, CartaoTexto],
  selector: 'app-criado-por-ti',
  styleUrl: './criado-por-ti.css',
  templateUrl: './criado-por-ti.html',
})
export class CriadoPorTi implements OnInit {
  criacoes = signal<Criacao[]>([]);
  templates = signal<TemplateMeme[]>([]);

  constructor(
    private criacoes_service: CriacoesService,
    private meme_service: MemeService,
  ) {}

  ngOnInit(): void {
    this.criacoes_service.listar().subscribe((lista) => this.criacoes.set(lista));
    this.meme_service.listar_templates().subscribe((lista) => this.templates.set(lista));
  }

  imagem_do_template(template_id: string): string {
    const template = this.templates().find((t) => t.id === template_id);
    return template ? template.imagem : '';
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


  
}
