import { CriacaoBase } from './criacao-base';
import { Origem } from './origem';

export interface Adivinha extends CriacaoBase {
  tipo: 'adivinha';
  pergunta: string;
  resposta: string;
  dica?: string;
  origem: Origem;
}
