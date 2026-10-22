export type CategoriaVideo = 'humoristas' | 'apanhados' | 'musicas';

export interface Video {
  readonly id: number;
  titulo: string;
  categoria: CategoriaVideo;
  youtube_id: string;
}
