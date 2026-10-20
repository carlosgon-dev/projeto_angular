import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estilo } from '../../models/estilo';
import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Criacao } from '../../models/criacao';
import { PedidoGerador } from '../../models/pedido-gerador';
import { GeradorService } from '../../services/gerador-service';
import { CriacoesService } from '../../services/criacoes-service';
import { CartaoTexto } from '../../components/cartao-texto/cartao-texto';
import { RouterLink } from '@angular/router';
import { Estrelas } from '../../components/estrelas/estrelas';
import { Estrelas as Nota } from '../../models/criacao-base';

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
    pais: new FormControl('', [Validators.required, Validators.minLength(3)]),
    profissao: new FormControl('', [Validators.required, Validators.minLength(3)]),
    objeto: new FormControl('', [Validators.required, Validators.minLength(2)]),
    fruta: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
  resultado = signal<Criacao | undefined>(undefined);
  private pedido_em_curso?: Subscription;

  constructor(
    private gerador_service: GeradorService,
    private criacoes_service: CriacoesService,
  ) {}

  gerar(): void {
    if (this.form.invalid) return;
    this.a_pensar.set(true);
    this.resultado.set(undefined);

    this.pedido_em_curso = this.gerador_service
      .gerar(this.montar_pedido())
      .subscribe((rascunho) => {
        this.criacoes_service.criar(rascunho).subscribe((criacao) => {
          this.resultado.set(criacao);
          this.a_pensar.set(false);
        });
      });
  }

  ngOnDestroy(): void {
    this.pedido_em_curso?.unsubscribe();
  }

  private montar_pedido(): PedidoGerador {
    const valores = this.form.value;
    return {
      nome: valores.nome ?? '',
      pais: valores.pais ?? '',
      profissao: valores.profissao ?? '',
      objeto: valores.objeto ?? '',
      fruta: valores.fruta ?? '',
      tipo: valores.tipo ?? 'piada',
      estilo: valores.estilo ?? Estilo.Classica,
      maldade: valores.maldade ?? 5,
    };
  }
}
