import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ExplorarService } from '../../services/explorar-service';
import { Piada } from '../../models/piada';
import { Adivinha } from '../../models/adivinha';
import { MemeInternet } from '../../models/meme-internet';
import { OPCOES_CRIACOES, OpcaoFiltro, TipoFiltro } from '../../models/filtro';
import { VideoService } from '../../services/video-service';
import { Video } from '../../models/video';
import { YoutubePipe } from '../../pipes/youtube-pipe';
import { Filtro } from '../../components/filtro/filtro';
import { CartaoMeme } from '../../components/cartao-meme/cartao-meme';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { Janela } from '../../components/janela/janela';
import { LeitorService } from '../../services/leitor-service';

const ENDERECO_IMAGEM_YOUTUBE = 'https://i.ytimg.com/vi/';

const OPCOES_EXPLORAR: OpcaoFiltro[] = [
  ...OPCOES_CRIACOES,
  { valor: 'humoristas', nome: '🎭 Humoristas' },
  { valor: 'apanhados', nome: '📺 Apanhados' },
  { valor: 'musicas', nome: '🎵 Músicas' },
];

@Component({
  imports: [Filtro, CartaoMeme, CartaoTexto, DecimalPipe, Janela, YoutubePipe],
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
  videos = signal<Video[]>([]);
  video_aberto = signal<Video | undefined>(undefined);
  opcoes = OPCOES_EXPLORAR;

  constructor(
    private explorar_service: ExplorarService,
    private video_service: VideoService,
    private leitor_service: LeitorService,
  ) {}

  ngOnInit(): void {
    this.explorar_service.listar_memes().subscribe((lista) => this.memes.set(lista));
    this.explorar_service.listar_piadas().subscribe((lista) => this.piadas.set(lista));
    this.explorar_service.listar_adivinhas().subscribe((lista) => this.adivinhas.set(lista));
    this.video_service.listar_videos().subscribe((lista) => this.videos.set(lista));
  }

  mostrar(tipo: TipoFiltro): boolean {
    return this.filtro() === tipo;
  }

  fechar(): void {
    this.meme_aberto.set(undefined);
    this.texto_aberto.set(undefined);
    this.video_aberto.set(undefined);
    this.leitor_service.retomar_depois_do_video();
  }

  videos_filtrados(): Video[] {
    return this.videos().filter((video) => video.categoria === this.filtro());
  }

  imagem_do_video(video: Video): string {
    return `${ENDERECO_IMAGEM_YOUTUBE}${video.youtube_id}/hqdefault.jpg`;
  }

    abrir_video(video: Video): void {
    this.video_aberto.set(video);
    this.leitor_service.pausar_por_video();
  }

}
