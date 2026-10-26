import { Estilo } from './estilo';

export interface PedidoGerador {
  nome: string;
  profissao: string;
  lugar: string;
  objeto: string;
  animal: string;
  superpoder: string;
  comida: string;
  tipo: 'piada' | 'adivinha';
  estilo: Estilo;
  maldade: number;
}
