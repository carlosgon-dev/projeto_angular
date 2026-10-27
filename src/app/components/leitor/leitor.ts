import { AfterViewInit, Component, effect, OnDestroy, signal, untracked } from '@angular/core';
import { LeitorService } from '../../services/leitor-service';

const ENDERECO_API_YOUTUBE = 'https://www.youtube.com/iframe_api';
const ID_DO_REPRODUTOR = 'reprodutor-youtube';
const ESTADO_TERMINOU = 0;

/* Só os métodos do leitor do YouTube que usamos */
interface ReprodutorYoutube {
  loadVideoById(youtube_id: string): void;
  cueVideoById(youtube_id: string): void;
  playVideo(): void;
  pauseVideo(): void;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
}

/* O script do YouTube cria o window.YT e, quando está pronto, chama o window.onYouTubeIframeAPIReady */
declare global {
  interface Window {
    YT: { Player: new (id_do_elemento: string, opcoes: object) => ReprodutorYoutube };
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  imports: [],
  selector: 'app-leitor',
  styleUrl: './leitor.css',
  templateUrl: './leitor.html',
})
export class Leitor implements AfterViewInit, OnDestroy {
  id_do_reprodutor = ID_DO_REPRODUTOR;
  private reprodutor = signal<ReprodutorYoutube | null>(null);

  /* Os effect() correm sozinhos sempre que um signal que leem muda:
     é assim que os botões da barra mandam no YouTube escondido */
  constructor(public leitor: LeitorService) {
    effect(() => this.mudar_de_faixa());
    effect(() => this.tocar_ou_pausar());
    effect(() => this.acertar_volume());
  }

  ngAfterViewInit(): void {
    window.onYouTubeIframeAPIReady = () => this.criar_reprodutor();
    const script = document.createElement('script');
    script.src = ENDERECO_API_YOUTUBE;
    document.body.appendChild(script);
  }

  ngOnDestroy(): void {
    this.reprodutor()?.destroy();
  }

  ao_mexer_no_volume(evento: Event): void {
    const barra = evento.target as HTMLInputElement;
    this.leitor.mudar_volume(Number(barra.value));
  }

  private criar_reprodutor(): void {
    new window.YT.Player(ID_DO_REPRODUTOR, {
      height: '0',
      width: '0',
      playerVars: { playsinline: 1 },
      events: {
        onReady: (evento: { target: ReprodutorYoutube }) => this.reprodutor.set(evento.target),
        onStateChange: (evento: { data: number }) => {
          if (evento.data === ESTADO_TERMINOU) this.leitor.seguinte();
        },
        // Alguns vídeos não deixam ser tocados fora do YouTube: salta para a seguinte
        onError: () => this.leitor.seguinte(),
      },
    });
  }

  /* Se já estava a tocar, a faixa nova começa logo; senão, fica só preparada */
  private mudar_de_faixa(): void {
    const reprodutor = this.reprodutor();
    const faixa = this.leitor.faixa_atual();
    if (!reprodutor || !faixa) return;
    if (untracked(() => this.leitor.a_tocar())) {
      reprodutor.loadVideoById(faixa.youtube_id);
      return;
    }
    reprodutor.cueVideoById(faixa.youtube_id);
  }

  private tocar_ou_pausar(): void {
    const reprodutor = this.reprodutor();
    const a_tocar = this.leitor.a_tocar();
    if (!reprodutor) return;
    if (a_tocar) {
      reprodutor.playVideo();
      return;
    }
    reprodutor.pauseVideo();
  }

  private acertar_volume(): void {
    const reprodutor = this.reprodutor();
    const volume = this.leitor.volume();
    const mudo = this.leitor.mudo();
    if (!reprodutor) return;
    reprodutor.setVolume(volume);
    if (mudo) {
      reprodutor.mute();
      return;
    }
    reprodutor.unMute();
  }
}
