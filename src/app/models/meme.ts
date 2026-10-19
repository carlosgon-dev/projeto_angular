import { CriacaoBase } from './criacao-base';

export interface Meme extends CriacaoBase {
  tipo: 'meme';
  template_id: string;
  texto_cima: string;
  texto_baixo: string;
}
