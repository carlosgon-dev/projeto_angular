import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SaudacaoPipe } from '../../pipes/saudacao-pipe';

@Component({
  imports: [RouterLink, SaudacaoPipe],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  nome = 'Carlos';

  zonas = [
    { caminho: '/explorar', icone: '🌍', titulo: 'Explorar', texto: 'Memes, piadas e adivinhas para te rires já.' },
    { caminho: '/arena', icone: '⚔️', titulo: 'Arena', texto: 'Duelo de piadas: vota na melhor e vê o pódio.' },
    { caminho: '/gerador', icone: '🤖', titulo: 'Gerador', texto: 'Dás as palavras, o estilo e a maldade. A IA faz o resto.' },
    { caminho: '/escrever', icone: '✍️', titulo: 'Escrever', texto: 'Cria o teu meme, a tua piada ou a tua adivinha.' },
    { caminho: '/criado', icone: '⭐', titulo: 'Criado por ti', texto: 'Tudo o que fizeste, num só sítio. Avalia com estrelas.' },
  ];
}
