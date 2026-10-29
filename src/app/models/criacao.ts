import { Meme } from './meme';
import { Piada } from './piada';
import { Adivinha } from './adivinha';

export type Criacao = Meme | Piada | Adivinha;

export type Rascunho<T> = Omit<T, 'id' | 'data_criacao' | 'estrelas'>;

export type NovaCriacao = Rascunho<Meme> | Rascunho<Piada> | Rascunho<Adivinha>;

export type NovoTexto = Rascunho<Piada> | Rascunho<Adivinha>;
