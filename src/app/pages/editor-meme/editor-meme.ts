import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../../services/meme-service';
import { TemplateMeme } from '../../models/template-meme';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CriacoesService } from '../../services/criacoes-service';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-editor-meme',
  styleUrl: './editor-meme.css',
  templateUrl: './editor-meme.html',
})
export class EditorMeme implements OnInit {
  template = signal<TemplateMeme | undefined>(undefined);

  form = new FormGroup({
    texto_cima: new FormControl('', [Validators.maxLength(40)]),
    texto_baixo: new FormControl('', [Validators.maxLength(40)]),
  });

  constructor(
    private rota: ActivatedRoute,
    private meme_service: MemeService,
    private criacoes_service: CriacoesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.rota.snapshot.paramMap.get('id');
    this.meme_service.listar_templates().subscribe((lista) => {
      this.template.set(lista.find((template) => template.id === id));
    });
  }

    guardar(): void {
    const escolhido = this.template();
    if (!escolhido || this.form.invalid) return;

    this.criacoes_service
      .criar({
        tipo: 'meme',
        template_id: escolhido.id,
        texto_cima: this.form.value.texto_cima ?? '',
        texto_baixo: this.form.value.texto_baixo ?? '',
      })
      .subscribe(() => {
        this.router.navigate(['/criado']);
      });
  }

}
