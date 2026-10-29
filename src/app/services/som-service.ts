import { Injectable } from '@angular/core';
import { LeitorService } from './leitor-service';

@Injectable({
  providedIn: 'root',
})
export class SomService {
  constructor(private leitor_service: LeitorService) {}

  tocar_efeito(caminho: string): void {
    if (this.leitor_service.mudo()) return;
    const som = new Audio(caminho);
    som.volume = this.leitor_service.volume() / 100;
    som.play().catch(() => undefined);
  }
}
