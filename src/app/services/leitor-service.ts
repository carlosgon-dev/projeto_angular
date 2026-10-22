import { Injectable, signal } from '@angular/core';
import { Video } from '../models/video';
import { VideoService } from './video-service';

const VOLUME_INICIAL = 70;

@Injectable({
  providedIn: 'root',
})
export class LeitorService {
  faixas = signal<Video[]>([]);
  indice = signal(0);
  a_tocar = signal(false);
  volume = signal(VOLUME_INICIAL);
  mudo = signal(false);

  constructor(private video_service: VideoService) {
    this.video_service.listar_videos().subscribe((lista) =>
      this.faixas.set(lista.filter((video) => video.categoria === 'musicas')),
    );
  }

  faixa_atual(): Video | undefined {
    return this.faixas()[this.indice()];
  }

  tocar_ou_pausar(): void {
    this.a_tocar.set(!this.a_tocar());
  }

  seguinte(): void {
    this.mudar_faixa(1);
  }

  anterior(): void {
    this.mudar_faixa(-1);
  }

  alternar_som(): void {
    this.mudo.set(!this.mudo());
  }

  mudar_volume(valor: number): void {
    this.volume.set(valor);
    this.mudo.set(false);
  }

  private mudar_faixa(passo: number): void {
    const total = this.faixas().length;
    if (total === 0) return;
    this.indice.set((this.indice() + passo + total) % total);
  }
}
