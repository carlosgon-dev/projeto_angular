import { CriacaoBase } from './criacao-base';

export interface Meme extends CriacaoBase {
  tipo: 'meme';
  templateId: string;
  textoCima: string;
  textoBaixo: string;
}
