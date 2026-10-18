import { CriacaoBase } from './criacao-base';
import { Origem } from './origem';

export interface Piada extends CriacaoBase {
  tipo: 'piada';
  pergunta: string;
  remate: string;
  origem: Origem;
}
