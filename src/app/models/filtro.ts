import { CategoriaVideo } from './video';

export type TipoFiltro = 'meme' | 'piada' | 'adivinha' | CategoriaVideo;

export interface OpcaoFiltro {
  valor: TipoFiltro;
  nome: string;
}

export const OPCOES_CRIACOES: OpcaoFiltro[] = [
  { valor: 'meme', nome: '🖼️ Memes' },
  { valor: 'piada', nome: '😂 Piadas' },
  { valor: 'adivinha', nome: '🧩 Adivinhas' },
];
