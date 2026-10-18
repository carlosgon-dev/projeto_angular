import { Component, OnInit, signal } from '@angular/core';
import { MemeService } from '../../services/meme-service';
import { TemplateMeme } from '../../models/template-meme';

@Component({
  imports: [],
  selector: 'app-escrever',
  styleUrl: './escrever.css',
  templateUrl: './escrever.html',
})
export class Escrever implements OnInit {
  templates = signal<TemplateMeme[]>([]);                        // ← 2. a caixa começa vazia

  constructor(private memeService: MemeService) {}

  ngOnInit(): void {
    this.memeService.listarTemplates().subscribe((lista) => {
      this.templates.set(lista);                                 // ← 3. pôr a lista na caixa
    });
  }
}
