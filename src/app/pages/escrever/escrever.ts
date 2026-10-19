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
  templates = signal<TemplateMeme[]>([]);

  constructor(private meme_service: MemeService) {}

  ngOnInit(): void {
    this.meme_service.listar_templates().subscribe((lista) => {
      this.templates.set(lista);
    });
  }
}
