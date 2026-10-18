import { Estilo } from './estilo';

export interface PedidoGerador {
  pais: string;
  profissao: string;
  objeto: string;
  fruta: string;
  tipo: 'piada' | 'adivinha';
  estilo: Estilo;
  maldade: number;
}
