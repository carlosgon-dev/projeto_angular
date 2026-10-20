import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piada } from '../models/piada';
import { Adivinha } from '../models/adivinha';
import { MemeInternet } from '../models/meme-internet';

@Injectable({
  providedIn: 'root',
})
export class ExplorarService {
  constructor(private http: HttpClient) {}

  listar_piadas(): Observable<Piada[]> {
    return this.http.get<Piada[]>('dados/piadas.json');
  }

  listar_adivinhas(): Observable<Adivinha[]> {
    return this.http.get<Adivinha[]>('dados/adivinhas.json');
  }

  listar_memes(): Observable<MemeInternet[]> {
    return this.http.get<MemeInternet[]>('dados/memes-internet.json');
  }

}
