import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ExplorarService } from '../../services/explorar-service';
import { VideoService } from '../../services/video-service';
import { LeitorService } from '../../services/leitor-service';
import { MemeInternet } from '../../models/meme-internet';
import { Piada } from '../../models/piada';
import { Adivinha } from '../../models/adivinha';
import { Video } from '../../models/video';
import { Janela } from '../janela/janela';
import { CartaoMeme } from '../cartao-meme/cartao-meme';
import { CartaoTexto } from '../cartao-texto/cartao-texto';
import { YoutubePipe } from '../../pipes/youtube-pipe';

const ESPERA_ANTES_DA_SURPRESA_MS = 3000;
const UM_SEGUNDO_MS = 1000;

const VELOCIDADE_INICIAL = 420;
const VELOCIDADE_MINIMA = 140;
const VELOCIDADE_MAXIMA = 2520;
const EMPURRAO = 420;
const TEMPO_DE_TRAVAGEM_S = 3;

const FUMO_POR_SEGUNDO = 26;
const FORCA_DAS_FAISCAS = 0.8;

const SOM_MOTOR = 'sons/motor.mp3';
const SOM_TRAVAGEM = 'sons/travagem.mp3';
const SOM_MUSICA = 'sons/preco-certo.mp3';
const SOM_ACIDENTE = 'sons/acidente.mp3';
const INICIO_DA_TRAVAGEM_S = 0.25;
const TRAVAGEM_CURTA_MS = 900;
const RITMO_DEVAGAR = 0.8;
const RITMO_DEPRESSA = 1.6;
const RITMO_A_MORRER = 0.25;

type Fatia = 'meme' | 'piada' | 'adivinha' | 'video';
const FATIAS: Fatia[] = ['meme', 'piada', 'adivinha', 'video'];
const GRAUS_POR_FATIA = 360 / FATIAS.length;

interface Particula {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  escala: number;
  faisca: boolean;
}

function ao_calhas<T>(lista: T[]): T | undefined {
  return lista[Math.floor(Math.random() * lista.length)];
}

@Component({
  imports: [Janela, CartaoMeme, CartaoTexto, YoutubePipe],
  selector: 'app-surpresa',
  styleUrl: './surpresa.css',
  templateUrl: './surpresa.html',
})
export class Surpresa implements OnInit, OnDestroy {
  aberta = signal(false);
  pronta = signal(false);
  rotacao = signal(0);
  velocidade = signal(0);
  a_travar = signal(false);
  fumo = signal<Particula[]>([]);
  fatia = signal<Fatia | null>(null);
  meme = signal<MemeInternet | undefined>(undefined);
  piada = signal<Piada | undefined>(undefined);
  adivinha = signal<Adivinha | undefined>(undefined);
  video = signal<Video | undefined>(undefined);
  velocidade_maxima = VELOCIDADE_MAXIMA;

  private memes: MemeInternet[] = [];
  private piadas: Piada[] = [];
  private adivinhas: Adivinha[] = [];
  private videos: Video[] = [];
  private espera = 0;
  private quadro = 0;
  private ultimo_instante = 0;
  private proximo_id = 0;
  private motor = new Audio(SOM_MOTOR);
  private travagem = new Audio(SOM_TRAVAGEM);
  private musica = new Audio(SOM_MUSICA);
  private acidente = new Audio(SOM_ACIDENTE);
  private corte_travagem = 0;
  private velocidade_ao_travar = 0;
  private ritmo_ao_travar = 1;

  constructor(
    private explorar_service: ExplorarService,
    private video_service: VideoService,
    private leitor_service: LeitorService,
  ) {
    this.musica.loop = true;
    this.musica.preservesPitch = false;
  }

  ngOnInit(): void {
    this.explorar_service.listar_memes().subscribe((lista) => (this.memes = lista));
    this.explorar_service.listar_piadas().subscribe((lista) => (this.piadas = lista));
    this.explorar_service.listar_adivinhas().subscribe((lista) => (this.adivinhas = lista));
    this.video_service.listar_videos().subscribe((lista) => (this.videos = lista));
    this.espera = window.setTimeout(() => this.abrir(), ESPERA_ANTES_DA_SURPRESA_MS);
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.espera);
    this.parar_tudo();
  }

  no_maximo(): boolean {
    return this.velocidade() >= VELOCIDADE_MAXIMA && !this.a_travar();
  }

  abrir(): void {
    window.clearTimeout(this.espera);
    this.parar_tudo();
    this.aberta.set(true);
    this.fatia.set(null);
    this.a_travar.set(false);
    this.velocidade.set(0);
    this.pronta.set(true);
  }

  girar(): void {
    this.pronta.set(false);
    this.velocidade.set(VELOCIDADE_INICIAL);
    this.ultimo_instante = performance.now();
    this.quadro = requestAnimationFrame((agora) => this.rodar(agora));
    this.leitor_service.pausar_por_video();
    this.tocar_musica();
  }

  acelerar(): void {
    if (this.a_travar()) return;
    this.velocidade.set(Math.min(VELOCIDADE_MAXIMA, this.velocidade() + EMPURRAO));
    this.rugir();
  }

  abrandar(): void {
    if (this.a_travar()) return;
    this.velocidade.set(Math.max(VELOCIDADE_MINIMA, this.velocidade() - EMPURRAO));
    this.tocar_travagem(TRAVAGEM_CURTA_MS);
  }

  parar(): void {
    if (this.a_travar()) return;
    this.a_travar.set(true);
    this.velocidade_ao_travar = this.velocidade();
    this.ritmo_ao_travar = this.musica.playbackRate;
    this.tocar_travagem();
  }

  fechar(): void {
    this.parar_tudo();
    this.aberta.set(false);
    this.leitor_service.retomar_depois_do_video();
  }

  apagar_particula(id: number): void {
    this.fumo.set(this.fumo().filter((particula) => particula.id !== id));
  }

  private rodar(agora: number): void {
    const segundos = (agora - this.ultimo_instante) / UM_SEGUNDO_MS;
    this.ultimo_instante = agora;
    if (this.a_travar()) {
      const travagem_por_segundo = this.velocidade_ao_travar / TEMPO_DE_TRAVAGEM_S;
      this.velocidade.set(Math.max(0, this.velocidade() - travagem_por_segundo * segundos));
    }
    this.rotacao.set(this.rotacao() + this.velocidade() * segundos);
    this.fazer_fumo(segundos);
    this.ajustar_musica();

    if (this.velocidade() > 0) {
      this.quadro = requestAnimationFrame((instante) => this.rodar(instante));
      return;
    }
    this.mostrar(this.fatia_no_ponteiro());
  }

  private fatia_no_ponteiro(): Fatia {
    const angulo_no_topo = (360 - (this.rotacao() % 360)) % 360;
    return FATIAS[Math.floor(angulo_no_topo / GRAUS_POR_FATIA)];
  }

  private fazer_fumo(segundos: number): void {
    const forca = (this.velocidade() - VELOCIDADE_INICIAL) / (VELOCIDADE_MAXIMA - VELOCIDADE_INICIAL);
    if (forca <= 0 || this.a_travar()) return;
    if (Math.random() > forca * FUMO_POR_SEGUNDO * segundos) return;

    const angulo = Math.random() * 2 * Math.PI;
    const nova: Particula = {
      id: this.proximo_id++,
      x: 50 + Math.cos(angulo) * 48,
      y: 50 + Math.sin(angulo) * 48,
      dx: Math.cos(angulo) * 30,
      dy: Math.sin(angulo) * 30 - 60,
      escala: 1.6 + forca * 2,
      faisca: forca > FORCA_DAS_FAISCAS && Math.random() < 0.5,
    };
    this.fumo.set([...this.fumo(), nova]);
  }

  private mostrar(fatia: Fatia): void {
    this.fumo.set([]);
    this.silenciar();
    this.bater();
    this.meme.set(ao_calhas(this.memes));
    this.piada.set(ao_calhas(this.piadas));
    this.adivinha.set(ao_calhas(this.adivinhas));
    this.video.set(ao_calhas(this.videos));
    if (fatia === 'video') this.leitor_service.pausar_por_video();
    this.fatia.set(fatia);
  }

  private parar_tudo(): void {
    cancelAnimationFrame(this.quadro);
    this.fumo.set([]);
    this.silenciar();
  }

  private volume_do_leitor(): number {
    return this.leitor_service.mudo() ? 0 : this.leitor_service.volume() / 100;
  }

  private tocar_musica(): void {
    this.musica.volume = this.volume_do_leitor();
    this.ajustar_musica();
    if (this.musica.paused) this.musica.play().catch(() => undefined);
  }

  private ajustar_musica(): void {
    if (this.a_travar()) {
      const falta = this.velocidade() / this.velocidade_ao_travar;
      this.musica.playbackRate = RITMO_A_MORRER + (this.ritmo_ao_travar - RITMO_A_MORRER) * falta;
      return;
    }
    const forca = this.velocidade() / VELOCIDADE_MAXIMA;
    this.musica.playbackRate = RITMO_DEVAGAR + (RITMO_DEPRESSA - RITMO_DEVAGAR) * forca;
  }

  private rugir(): void {
    this.tocar_musica();
    this.motor.currentTime = 0;
    this.motor.volume = this.volume_do_leitor();
    this.motor.play().catch(() => undefined);
  }

  private tocar_travagem(duracao_ms?: number): void {
    window.clearTimeout(this.corte_travagem);
    this.travagem.currentTime = INICIO_DA_TRAVAGEM_S;
    this.travagem.volume = Math.min(1, this.volume_do_leitor() * 2);
    this.travagem.play().catch(() => undefined);
    if (duracao_ms) this.corte_travagem = window.setTimeout(() => this.travagem.pause(), duracao_ms);
  }

  private bater(): void {
    this.acidente.currentTime = 0;
    this.acidente.volume = this.volume_do_leitor();
    this.acidente.play().catch(() => undefined);
  }

  private silenciar(): void {
    window.clearTimeout(this.corte_travagem);
    this.musica.pause();
    this.motor.pause();
    this.travagem.pause();
  }
}
