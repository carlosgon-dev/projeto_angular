export interface MemeImgflip {
  id: string;
  name: string;
  url: string;
}

export interface RespostaImgflip {
  success: boolean;
  data: { memes: MemeImgflip[] };
}
