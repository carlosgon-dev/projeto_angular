import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cartao-meme',
  styleUrl: './cartao-meme.css',
  templateUrl: './cartao-meme.html',
})
export class CartaoMeme {
  @Input() imagem = '';
  @Input() texto_cima = '';
  @Input() texto_baixo = '';
  @Input() miniatura = false;
}
