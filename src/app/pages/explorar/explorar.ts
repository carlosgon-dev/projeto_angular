import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ExplorarService } from '../../services/explorar-service';
import { Piada } from '../../models/piada';
import { Adivinha } from '../../models/adivinha';
import { MemeInternet } from '../../models/meme-internet';
import { TipoFiltro } from '../../models/filtro';
import { Filtro } from '../../components/filtro/filtro';
import { CartaoMeme } from '../../components/cartao-meme/cartao-meme';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { Janela } from '../../components/janela/janela';

@Component({
  imports: [Filtro, CartaoMeme, CartaoTexto, DecimalPipe, Janela],
  selector: 'app-explorar',
  styleUrl: './explorar.css',
  templateUrl: './explorar.html',
})
export class Explorar implements OnInit {
  memes = signal<MemeInternet[]>([]);
  piadas = signal<Piada[]>([]);
  adivinhas = signal<Adivinha[]>([]);
  filtro = signal<TipoFiltro>('meme');
  meme_aberto = signal<MemeInternet | undefined>(undefined);
  texto_aberto = signal<Piada | Adivinha | undefined>(undefined);

  constructor(private explorar_service: ExplorarService) {}

  ngOnInit(): void {
    this.explorar_service.listar_memes().subscribe((lista) => this.memes.set(lista));
    this.explorar_service.listar_piadas().subscribe((lista) => this.piadas.set(lista));
    this.explorar_service.listar_adivinhas().subscribe((lista) => this.adivinhas.set(lista));
  }

  mostrar(tipo: TipoFiltro): boolean {
    return this.filtro() === tipo;
  }

  fechar(): void {
    this.meme_aberto.set(undefined);
    this.texto_aberto.set(undefined);
  }
}
