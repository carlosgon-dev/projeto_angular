export interface MemeReddit {
  title: string;
  url: string;
  ups: number;
}

export interface RespostaMemeApi {
  count: number;
  memes: MemeReddit[];
}
