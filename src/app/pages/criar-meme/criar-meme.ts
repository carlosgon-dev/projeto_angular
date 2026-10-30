import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemeService } from '../../services/meme-service';
import { TemplateMeme } from '../../models/template-meme';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CriacoesService } from '../../services/criacoes-service';
import { CartaoMeme } from '../../components/cartao-meme/cartao-meme';

const MAXIMO_TEXTO_MEME = 40;

@Component({
  imports: [ReactiveFormsModule, CartaoMeme],
  selector: 'app-criar-meme',
  styleUrl: './criar-meme.css',
  templateUrl: './criar-meme.html',
})
export class CriarMeme implements OnInit {
  template = signal<TemplateMeme | undefined>(undefined);
  a_carregar = signal(true);
  maximo_texto = MAXIMO_TEXTO_MEME;

  form = new FormGroup({
    texto_cima: new FormControl('', [Validators.maxLength(MAXIMO_TEXTO_MEME)]),
    texto_baixo: new FormControl('', [Validators.maxLength(MAXIMO_TEXTO_MEME)]),
  });

  constructor(
    private rota: ActivatedRoute,
    private meme_service: MemeService,
    private criacoes_service: CriacoesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.rota.snapshot.paramMap.get('id');
    this.meme_service.listar_templates().subscribe((lista) => {
      this.template.set(lista.find((template) => template.id === id));
      this.a_carregar.set(false);
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
