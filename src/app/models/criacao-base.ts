export type Estrelas = 0 | 1 | 2 | 3 | 4 | 5;

export interface CriacaoBase {
  readonly id: number;
  data_criacao: string;
  estrelas: Estrelas;
  autor?: string;
}
