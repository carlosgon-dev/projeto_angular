import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estilo } from '../../models/estilo';
import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Criacao, NovoTexto } from '../../models/criacao';
import { PedidoGerador } from '../../models/pedido-gerador';
import { GeradorService } from '../../services/gerador-service';
import { CriacoesService } from '../../services/criacoes-service';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { RouterLink } from '@angular/router';
import { Estrelas } from '../../components/estrelas/estrelas';
import { Estrelas as Nota } from '../../models/criacao-base';
import { SomService } from '../../services/som-service';

const CAMPOS_SO_DA_PIADA = ['profissao', 'animal', 'superpoder', 'comida'] as const;
const SOM_GERAR = 'sons/rufar.mp3';
const SOM_GUARDAR = 'sons/ding.mp3';

@Component({
  imports: [ReactiveFormsModule, CartaoTexto, RouterLink, Estrelas],
  selector: 'app-gerador',
  styleUrl: './gerador.css',
  templateUrl: './gerador.html',
})
export class Gerador implements OnDestroy {
  avaliar(id: number, nota: Nota): void {
    this.criacoes_service.avaliar(id, nota).subscribe((lista) => {
      this.resultado.set(lista.find((criacao) => criacao.id === id));
    });
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    profissao: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lugar: new FormControl('', [Validators.required, Validators.minLength(3)]),
    objeto: new FormControl('', [Validators.required, Validators.minLength(2)]),
    animal: new FormControl('', [Validators.required, Validators.minLength(2)]),
    superpoder: new FormControl('', [Validators.required, Validators.minLength(3)]),
    comida: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tipo: new FormControl<'piada' | 'adivinha'>('piada'),
    estilo: new FormControl<Estilo>(Estilo.Classica),
    maldade: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(10)]),
  });

  estilos = [
    { valor: Estilo.Classica, nome: '🙂 Clássica' },
    { valor: Estilo.Absurda, nome: '🤪 Absurda' },
    { valor: Estilo.HumorNegro, nome: '🖤 Humor negro' },
  ];

  a_pensar = signal(false);
  rascunho = signal<NovoTexto | undefined>(undefined);
  a_guardar = signal(false);
  resultado = signal<Criacao | undefined>(undefined);
  private pedido_em_curso?: Subscription;
  private mudancas_de_tipo: Subscription;

  constructor(
    private gerador_service: GeradorService,
    private criacoes_service: CriacoesService,
    private som_service: SomService,
  ) {
    this.mudancas_de_tipo = this.form.controls.tipo.valueChanges.subscribe((tipo) =>
      this.mostrar_campos_de(tipo ?? 'piada'),
    );
  }

  e_adivinha(): boolean {
    return this.form.controls.tipo.value === 'adivinha';
  }

  gerar(): void {
    if (this.form.invalid) return;
    this.som_service.tocar_efeito(SOM_GERAR);
    this.a_pensar.set(true);
    this.resultado.set(undefined);
    this.rascunho.set(undefined);

    this.pedido_em_curso = this.gerador_service.gerar(this.montar_pedido()).subscribe((texto) => {
      this.rascunho.set(texto);
      this.a_pensar.set(false);
    });
  }

  guardar(): void {
    const texto = this.rascunho();
    if (!texto) return;
    this.a_guardar.set(true);

    this.criacoes_service.criar(texto).subscribe({
      next: (criacao) => {
        this.som_service.tocar_efeito(SOM_GUARDAR);
        this.resultado.set(criacao);
        this.rascunho.set(undefined);
        this.a_guardar.set(false);
      },
      error: () => this.a_guardar.set(false),
    });
  }

  ngOnDestroy(): void {
    this.pedido_em_curso?.unsubscribe();
    this.mudancas_de_tipo.unsubscribe();
  }

  private mostrar_campos_de(tipo: 'piada' | 'adivinha'): void {
    for (const campo of CAMPOS_SO_DA_PIADA) {
      const controlo = this.form.controls[campo];
      if (tipo === 'piada') controlo.enable();
      else controlo.disable();
    }
  }

  private montar_pedido(): PedidoGerador {
    const valores = this.form.value;
    return {
      nome: valores.nome ?? '',
      profissao: valores.profissao ?? '',
      lugar: valores.lugar ?? '',
      objeto: valores.objeto ?? '',
      animal: valores.animal ?? '',
      superpoder: valores.superpoder ?? '',
      comida: valores.comida ?? '',
      tipo: valores.tipo ?? 'piada',
      estilo: valores.estilo ?? Estilo.Classica,
      maldade: valores.maldade ?? 5,
    };
  }
}
